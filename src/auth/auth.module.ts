import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from './auth.service';
import { HttpAuthGuard } from './http.guard';
import { WsAuthGuard } from './ws.guard';

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  providers: [JwtStrategy, AuthService, HttpAuthGuard, WsAuthGuard],
  exports: [PassportModule, AuthService]
})
export class AuthModule {
}
