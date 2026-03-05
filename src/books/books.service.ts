import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  // 1. Create
  async create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  // 2. Find All + Search Logic
  async findAll(title?: string, author?: string) {
    const filter: Prisma.BookWhereInput = {};

    if (title) {
      filter.title = { contains: title }; // Cari judul mirip
    }

    if (author) {
      filter.author = { contains: author }; // Cari penulis mirip
    }

    return this.prisma.book.findMany({
      where: filter,
      orderBy: { title: 'asc' }, // Urut Abjad A-Z
    });
  }

  // 3. Find One
  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) throw new NotFoundException(`Buku ID ${id} tidak ada`);
    return book;
  }

  // 4. Update
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
