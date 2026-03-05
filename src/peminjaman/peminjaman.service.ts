import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PeminjamanService {
  constructor(private prisma: PrismaService) {}

  // 1. Create Peminjaman
  async create(dto: CreatePeminjamanDto) {
    // Kita bungkus dalam $transaction biar data konsisten
    return this.prisma.$transaction(async (tx) => {
      // A. Cek apakah Siswa ada?
      const student = await tx.student.findUnique({
        where: { id: dto.id_student },
      });
      if (!student) throw new NotFoundException('Siswa tidak ditemukan');

      // B. Cek apakah Buku ada & Stok aman?
      const book = await tx.book.findUnique({
        where: { id: dto.id_buku },
      });
      if (!book) throw new NotFoundException('Buku tidak ditemukan');
      if (book.stock <= 0) {
        throw new BadRequestException('Stok buku habis! Tidak bisa pinjam.');
      }

      // C. Kurangi Stok Buku (-1)
      await tx.book.update({
        where: { id: dto.id_buku },
        data: { stock: { decrement: 1 } }, // Fitur sakti Prisma: kurangi 1 otomatis
      });

      // D. Buat Data Peminjaman
      return tx.peminjaman.create({
        data: {
          id_student: dto.id_student,
          id_buku: dto.id_buku,
          tgl_pinjam: new Date(), // Otomatis hari ini
          tgl_kembali: new Date(dto.tgl_kembali),
          status: 'DIPINJAM', // Default status
        },
      });
    });
  }

  // 2. Lihat Semua
  async findAll() {
    return this.prisma.peminjaman.findMany({
      include: {
        student: { select: { name: true, kelas: true } },
        book: { select: { title: true, code: true } },
      },
      orderBy: { id_peminjaman: 'desc' },
    });
  }

  // 3. Lihat Satu
  async findOne(id: number) {
    const data = await this.prisma.peminjaman.findUnique({
      where: { id_peminjaman: id },
      include: { student: true, book: true },
    });
    if (!data) throw new NotFoundException('Data peminjaman tidak ditemukan');
    return data;
  }

  // 4. Update (Pengembalian Buku)
  async update(id: number, dto: UpdatePeminjamanDto) {
    // Kalau status diubah jadi 'KEMBALI', stok harus nambah +1
    if (dto.status === 'KEMBALI') {
      return this.prisma.$transaction(async (tx) => {
        // Ambil data peminjaman dulu buat tau buku apa yang dipinjam
        const pinjam = await tx.peminjaman.findUnique({
          where: { id_peminjaman: id },
        });
        if (!pinjam) throw new NotFoundException('Transaksi tidak ditemukan');

        // Kalau sebelumnya statusnya DIPINJAM, baru kita balikin stoknya
        if (pinjam.status === 'DIPINJAM') {
          await tx.book.update({
            where: { id: pinjam.id_buku },
            data: { stock: { increment: 1 } }, // Stok nambah 1
          });
        }

        // Update status peminjaman
        return tx.peminjaman.update({
          where: { id_peminjaman: id },
          data: { status: 'KEMBALI' },
        });
      });
    }

    // Update biasa (misal ganti tanggal)
    return this.prisma.peminjaman.update({
      where: { id_peminjaman: id },
      data: dto,
    });
  }

  // 5. Remove
  async remove(id: number) {
    return this.prisma.peminjaman.delete({
      where: { id_peminjaman: id },
    });
  }
}
