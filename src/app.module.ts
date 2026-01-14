import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { PrismaService } from './prisma.service'; // <--- 1. Tambahkan Import ini

@Module({
  imports: [StudentsModule], // <--- 2. HAPUS 'PrismaModule' dari sini
  controllers: [AppController],
  providers: [AppService, PrismaService], // <--- 3. Masukkan PrismaService ke sini
})
export class AppModule {}
