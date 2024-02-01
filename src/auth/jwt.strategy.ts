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
    }, function(jwt_payload, done) {
      return done(null, {}, {});
    });
  }

  validate(payload: JwtPayload): unknown {
    return payload;
  }
}
