import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtPayload } from 'jsonwebtoken';
import { Logger } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

export class BaseGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  authHeaderRegex = /^Bearer (.+)$/;
  constructor(protected logger: Logger, protected authService: AuthService) {
  }

  public afterInit(server: Server): any {
    this.logger.log(`Socket server init: path = ${server['name']}`);
  }

  public async handleConnection(socket: Socket): Promise<void> {
    const tokenHeader = socket.handshake.auth.token ?? socket.handshake.headers.authorization;
    let match = this.authHeaderRegex.exec(tokenHeader);
    if (match != null) {
      const token = match[1];
      const jwtPayload: string | JwtPayload = await this.authService.validateJwt(token);
      if (jwtPayload) {
        this.logger.log(`Client authenticated: ${socket.id}`);
        socket.data = jwtPayload;
        socket.join(`user:${jwtPayload['user_id']}`);
      } else {
        this.logger.log(`Client unauthorized: ${socket.id}`);
        socket.disconnect(true);
      }
    } else {
      this.logger.log(`Client unauthorized: ${socket.id}`);
      socket.disconnect(true);
    }
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

}
