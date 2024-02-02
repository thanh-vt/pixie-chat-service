import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { JwtPayload } from "jsonwebtoken";
import { jwksClientOption } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {

    super({
      secretOrKeyProvider: passportJwtSecret(jwksClientOption()),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // audience: process.env.AUTH0_AUDIENCE,
      // issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    }, function(tokenPayload: JwtPayload, done: (error: any, user?: any, info?: any) => void) {
      const user = {
        userId: tokenPayload.user_id,
        name: tokenPayload.name,
        username: tokenPayload.preferred_username,
        email: tokenPayload.email,
        givenName: tokenPayload.given_name,
        familyName: tokenPayload.family_name
      };
      return done(null, user, { exp: tokenPayload.exp, iat: tokenPayload.iat });
    });
  }

  validate(payload: JwtPayload): unknown {
    return payload;
  }
}
