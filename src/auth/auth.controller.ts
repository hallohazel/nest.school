import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LOGIN
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  // REGISTER (PUBLIK)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Timpa role apa pun yang dikirim user menjadi MEMBER
    return this.authService.register({
      ...registerDto,
      role: 'MEMBER',
    });
  }
}
