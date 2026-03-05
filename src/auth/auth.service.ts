import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

export interface RegisterData {
  username: string;
  password: string;
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // --- LOGIN ---
  async login(username: string, password: string) {
    // 1. Cari user dan relasi member (jika ada)
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: { member: true },
    });

    // 2. Validasi keberadaan user
    if (!user) {
      throw new UnauthorizedException('Username tidak ditemukan');
    }

    // 3. Validasi password (compare hash)
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Password salah');
    }

    // 4. Siapkan payload token (termasuk memberId)
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      memberId: user.memberId,
    };

    // 5. Generate token
    return {
      message: 'Login berhasil',
      access_token: this.jwtService.sign(payload),
    };
  }

  // --- REGISTER ---
  async register(data: RegisterData) {
    // 1. Enkripsi password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 2. Simpan user baru ke database
    return this.prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
        role: data.role,
      },
    });
  }
}
