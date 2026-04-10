import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { PrismaService } from '../prisma.service';
export declare class PeminjamanService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePeminjamanDto): Promise<{
        id_student: number;
        id_buku: number;
        tgl_kembali: Date;
        status: string;
        id_peminjaman: number;
        tgl_pinjam: Date;
    }>;
    findAll(): Promise<({
        student: {
            name: string;
            kelas: string;
        };
        book: {
            code: string;
            title: string;
        };
    } & {
        id_student: number;
        id_buku: number;
        tgl_kembali: Date;
        status: string;
        id_peminjaman: number;
        tgl_pinjam: Date;
    })[]>;
    findOne(id: number): Promise<{
        student: {
            nis: string;
            name: string;
            email: string | null;
            kelas: string;
            jurusan: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        book: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            code: string;
            title: string;
            author: string;
            publisher: string;
            year: number;
            stock: number;
        };
    } & {
        id_student: number;
        id_buku: number;
        tgl_kembali: Date;
        status: string;
        id_peminjaman: number;
        tgl_pinjam: Date;
    }>;
    update(id: number, dto: UpdatePeminjamanDto): Promise<{
        id_student: number;
        id_buku: number;
        tgl_kembali: Date;
        status: string;
        id_peminjaman: number;
        tgl_pinjam: Date;
    }>;
    remove(id: number): Promise<{
        id_student: number;
        id_buku: number;
        tgl_kembali: Date;
        status: string;
        id_peminjaman: number;
        tgl_pinjam: Date;
    }>;
}
