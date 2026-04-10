import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        message: string;
        access_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        createdAt: Date;
        id: number;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        memberId: number | null;
    }>;
}
