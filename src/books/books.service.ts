import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  // Create
  async create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  // Find All + Search Logic
  async findAll(title?: string, author?: string) {
    const filter: Prisma.BookWhereInput = {};

    if (title) {
      filter.title = { contains: title };
    }

    if (author) {
      filter.author = { contains: author };
    }

    return this.prisma.book.findMany({
      where: filter,
      orderBy: { title: 'asc' },
      // PENTING: Kita pilih kolom yang mau ditampilkan saja
      select: {
        id: true,
        code: true,
        title: true,
        author: true,
        publisher: true,
        year: true,
        stock: true,
        // createdAt: false, // Gak usah dikirim (Hemat bandwidth)
        // updatedAt: false, // Gak usah dikirim
      },
    });
  }

  // Find One
  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) throw new NotFoundException(`Buku ID ${id} tidak ada`);
    return book;
  }

  // Update
  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.findOne(id); // Cek dulu
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  // 5. Remove
  async remove(id: number) {
    await this.findOne(id); // Cek dulu
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
