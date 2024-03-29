import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    console.log(body);
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }
}
