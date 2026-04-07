import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 👈 1. Tambahkan import ini
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { PrismaService } from './prisma.service';
import { PeminjamanModule } from './peminjaman/peminjaman.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StudentsModule,
    PeminjamanModule,
    AuthModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
