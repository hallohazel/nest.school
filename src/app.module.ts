import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { PrismaService } from './prisma.service';
// HAPUS BARIS INI: import { BookModule } ... (Sudah tidak dipakai)
import { PeminjamanModule } from './peminjaman/peminjaman.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module'; // ✅ Pakai yang ini (Jamak)

@Module({
  imports: [StudentsModule, PeminjamanModule, AuthModule, BooksModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
