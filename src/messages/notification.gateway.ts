import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { WS_PATH, WS_PORT } from '../app.config';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway(WS_PORT, {
  path: WS_PATH,
  namespace: 'notification',
  transports: ['polling', 'websocket'],
})
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('NotificationGateway');

  constructor(private authService: AuthService) {
  }

  @WebSocketServer() server: Server;

  afterInit(server: Server): any {
    setInterval(() => {
      this.server.emit('notification', { message: 'Test notification ' });
    }, 5000);
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  authHeaderRegex = /^Bearer (.+)$/;

  public async handleConnection(client: Socket): Promise<void> {
    const tokenHeader = client.handshake.headers.authorization;
    let match = this.authHeaderRegex.exec(tokenHeader)
    if (match != null) {
      const token = match[1];
      if (await this.authService.validateJwt(token)) {
        this.logger.log(`Client authenticated: ${client.id}`);
      } else {
        this.logger.log(`Client unauthorized: ${client.id}`);
        client.disconnect(true);
      }
    } else {
      this.logger.log(`Client unauthorized: ${client.id}`);
      client.disconnect(true);
    }
  }
}
