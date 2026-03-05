import { PartialType } from '@nestjs/mapped-types';
import { CreatePeminjamanDto } from './create-peminjaman.dto';
import { IsOptional, IsString } from 'class-validator'; // 👈 Jangan lupa import ini

export class UpdatePeminjamanDto extends PartialType(CreatePeminjamanDto) {
  // Kita tambahkan ini secara manual biar Service bisa baca dto.status
  @IsOptional()
  @IsString()
  status?: string;
}
