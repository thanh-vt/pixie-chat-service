import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(80, { namespace: 'notification', transports: ['websocket'] })
export class NotificationGateway implements OnGatewayInit {
  private logger: Logger = new Logger('NotificationGateway');

  @WebSocketServer() server: Server;

  afterInit(server: Server): any {
    setInterval(() => {
      this.server.emit('notification', { message: 'Test notification ' });
    }, 5000);
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket): void {
    return this.logger.log(`Client connected: ${client.id}`);
  }
}
