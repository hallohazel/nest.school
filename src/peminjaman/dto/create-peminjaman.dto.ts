import { IsInt, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreatePeminjamanDto {
  @IsOptional()
  @IsInt()
  id_student?: number;

  @IsNotEmpty()
  @IsInt()
  id_buku: number;

  @IsNotEmpty()
  @IsDateString()
  tgl_kembali: string;
}
