import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from "rxjs";

@Injectable()
export class HttpAuthGuard extends AuthGuard('jwt') {
  private logger: Logger = new Logger(HttpAuthGuard.name);
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isValidJwt = await super.canActivate(context);
    if (!isValidJwt) return false;
    this.logger.log('User: ', context.switchToHttp().getRequest().user);
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
