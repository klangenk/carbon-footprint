import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}
  async validateGoogleLogin(profile: any) {
    /**
     * TODO: Validate Google user here
     */
    return {
      jwt: sign(profile, this.configService.get('JWT_SECRET'), {
        expiresIn: 3600,
      }),
    };
  }
}
