import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
export interface RegisterData {
    username: string;
    password: string;
    role: UserRole;
}
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(username: string, password: string): Promise<{
        message: string;
        access_token: string;
    }>;
    register(data: RegisterData): Promise<{
        createdAt: Date;
        id: number;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        memberId: number | null;
    }>;
}
