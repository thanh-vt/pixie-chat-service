import {
  ConnectedSocket,
  MessageBody, SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { WS_PATH, WS_PORT } from '../app.config';
import { BaseGateway } from './base.gateway';
import { AuthService } from '../auth/auth.service';
import { MessagesService } from './messages.service';

@WebSocketGateway(WS_PORT, {
  path: WS_PATH,
  namespace: 'public-chat',
  transports: ['websocket'],
  cors: '*'
})
export class PublicChatGateway extends BaseGateway {
  protected readonly logger: Logger;

  constructor(protected readonly authService: AuthService, private messagesService: MessagesService) {
    const logger = new Logger(PublicChatGateway.name)
    super(logger, authService);
    this.logger = logger;
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): WsResponse<unknown> {
    this.logger.log(client, payload);
    return {
      event: payload.to,
      data: `Hello ${payload.to}, my name is ${payload.from}!`,
    };
  }

  afterInit(server: Server): void {
    super.afterInit(server);
    this.messagesService.publicChatGatewayServer = server['server'];
  }
}
