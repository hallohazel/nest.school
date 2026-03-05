import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client'; // 👈 1. TAMBAHKAN IMPORT INI

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  // 1. Create
  async create(dto: CreateStudentDto) {
    return this.prisma.student.create({ data: dto });
  }

  // 2. Find All (Search Engine)
  async findAll(nis?: string, name?: string) {
    const filter: Prisma.StudentWhereInput = {};

    if (nis) {
      filter.nis = {
        contains: nis, // Biar bisa cari separuh angka
      };
    }

    if (name) {
      filter.name = {
        contains: name,
        // mode: 'insensitive' // (Opsional)
      };
    }

    return this.prisma.student.findMany({
      where: filter,
      orderBy: { id: 'desc' }, // Siswa terbaru muncul paling atas
    });
  }

  // 3. Find One
  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Siswa tidak ditemukan');
    }
    return student;
  }

  // 4. Update
  async update(id: number, dto: UpdateStudentDto) {
    await this.findOne(id);
    return this.prisma.student.update({
      where: { id },
      data: dto,
    });
  }

  // 5. Remove
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.student.delete({ where: { id } });
  }
}
