import { Controller, Post, Body } from '@nestjs/common';
import { AuthService, RegisterData } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // --- ENDPOINT LOGIN ---
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  // --- ENDPOINT REGISTER ---
  @Post('register')
  register(@Body() body: RegisterData) {
    return this.authService.register(body);
  }
}
