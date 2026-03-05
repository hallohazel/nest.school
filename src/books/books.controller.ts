import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('books') // URL-nya jadi localhost:3000/books
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // 1. Tambah Buku (Cuma Admin & Petugas)
  @Post()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  // 2. Lihat & Cari Buku (Semua Boleh, termasuk Member)
  // Contoh URL: /books?title=Harry&author=Rowling
  @Get()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS, UserRole.MEMBER)
  findAll(@Query('title') title?: string, @Query('author') author?: string) {
    return this.booksService.findAll(title, author);
  }

  // 3. Lihat 1 Buku Detail
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS, UserRole.MEMBER)
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  // 4. Update Buku (Admin & Petugas)
  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  // 5. Hapus Buku (Admin & Petugas)
  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
