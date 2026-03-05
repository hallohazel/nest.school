import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePeminjamanDto {
  @IsInt()
  @IsNotEmpty()
  id_student: number;

  @IsInt()
  @IsNotEmpty()
  id_buku: number;

  @IsDateString() // (YYYY-MM-DD)
  @IsNotEmpty()
  tgl_kembali: string;
}
