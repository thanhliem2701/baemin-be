import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    return this.authService.login(username, password);
  }

  @Post('verify')
  verify(@Body() body: { token: string, sercretCode: string }) {
    const { token, sercretCode } = body;
    return this.authService.verify(token, sercretCode);
  }

  @Post('refresh-token')
  refreshToken(@Body() body: { username: string, refreshToken: string }) {
    const { username, refreshToken } = body;
    return this.authService.refreshToken(username, refreshToken);
  }

}
