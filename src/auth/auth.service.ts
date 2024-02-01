import { Injectable } from '@nestjs/common';
import { JwksClient, Options } from 'jwks-rsa';
import { verify, JwtPayload } from 'jsonwebtoken';
export const jwksClientOption: () => Options = () => ({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: process.env.AUTH0_ISSUER_URL,
});

@Injectable()
export class AuthService {

  private jwksClient: JwksClient;

  constructor() {
    this.jwksClient = new JwksClient(jwksClientOption());
  }

  async validateJwt(token: string) {
    const pubKeys = await this.jwksClient.getSigningKeys();
    const jwtValidation = { valid: false };
    for (let pubKey of pubKeys) {
      // @ts-ignore
      const payload: JwtPayload | string = verify(token, pubKey.getPublicKey());
      jwtValidation.valid = !!payload;
      if (jwtValidation.valid) return true;
    }
    return false;
  }

}
