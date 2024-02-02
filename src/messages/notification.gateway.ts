import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { WS_PATH, WS_PORT } from '../app.config';
import { AuthService } from '../auth/auth.service';
import { BaseGateway } from './base.gateway';
import { MessagesService } from './messages.service';

@WebSocketGateway(WS_PORT, {
  path: WS_PATH,
  namespace: 'notification',
  transports: ['websocket'],
  cors: '*'
})
export class NotificationGateway extends BaseGateway {
  protected logger: Logger;

  constructor(protected authService: AuthService, private messagesService: MessagesService) {
    const logger = new Logger(NotificationGateway.name);
    super(logger, authService)
    this.logger = logger;
  }

  @WebSocketServer() server: Server;

  afterInit(server: Server): void {
    super.afterInit(server);
    this.messagesService.notificationGatewayServer = server['server'];
  }
}
