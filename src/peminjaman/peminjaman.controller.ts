import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('peminjaman')
export class PeminjamanController {
  constructor(private readonly peminjamanService: PeminjamanService) {}

  // 1. PINJAM BUKU (Create) - Admin & Petugas
  @Post()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  create(@Body() createPeminjamanDto: CreatePeminjamanDto) {
    return this.peminjamanService.create(createPeminjamanDto);
  }

  // 2. LIHAT HISTORY (FindAll) - Admin & Petugas
  @Get()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  findAll() {
    return this.peminjamanService.findAll();
  }

  // 3. LIHAT DETAIL (FindOne) - Semua Boleh
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS, UserRole.MEMBER)
  findOne(@Param('id') id: string) {
    return this.peminjamanService.findOne(+id);
  }

  // 4. KEMBALIKAN BUKU / EDIT (Update) - Admin & Petugas
  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  update(
    @Param('id') id: string,
    @Body() updatePeminjamanDto: UpdatePeminjamanDto,
  ) {
    return this.peminjamanService.update(+id, updatePeminjamanDto);
  }

  // 5. HAPUS DATA (Delete) - Admin Only
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.peminjamanService.remove(+id);
  }
}
