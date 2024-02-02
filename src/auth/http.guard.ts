import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Socket } from "socket.io";

@Injectable()
export class HttpAuthGuard extends AuthGuard('jwt') {
  private logger: Logger = new Logger(HttpAuthGuard.name);
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const user: any = context.switchToHttp().getRequest().user;
    this.logger.log('Logged in user', user);
    if (!user) {
      throw new UnauthorizedException('User unauthenticated!');
    }
    return true;
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
