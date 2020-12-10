import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Login endpoint that redirects to Google
   */
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiTags('Auth')
  googleLogin() {}

  /**
   * Callback endpoint for Google OAuth
   */
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiTags('Auth')
  @Redirect()
  async getUserFromGoogleLogin(@Req() req): Promise<any> {
    const frontendUrl = this.configService.get('FRONTEND_URL');
    return {
      url: `${frontendUrl}?jwt=${req.user.jwt}`,
    };
  }
}
