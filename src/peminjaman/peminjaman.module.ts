import { Module } from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { PeminjamanController } from './peminjaman.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PeminjamanController],
  providers: [PeminjamanService, PrismaService],
})
export class PeminjamanModule {}
