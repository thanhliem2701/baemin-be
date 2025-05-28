import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { messages } from 'src/constants/messages';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    //validate null
    if (!username || !password) return messages.USER_NOT_FOUND;

    return this.authService.login(username, password);
  }

  @Post('verify')
  verify(@Body() body: { token: string, sercretCode: string }) {
    const { token, sercretCode } = body;
    //validate null
    if (!token || !sercretCode) return messages.TOKEN_VERIFICATION_FAILED;

    return this.authService.verify(token, sercretCode);
  }

  @Post('refresh-token')
  refreshToken(@Body() body: { username: string, refreshToken: string }) {
    const { username, refreshToken } = body;
    //validate null
    if (!username || !refreshToken) return messages.TOKEN_VERIFICATION_FAILED;

    return this.authService.refreshToken(username, refreshToken);
  }

}
