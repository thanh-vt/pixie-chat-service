import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { WS_PATH, WS_PORT } from '../app.config';
import { Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BaseGateway } from './base.gateway';
import { AuthService } from '../auth/auth.service';
import { Server } from 'socket.io';
import { WsAuthGuard } from '../auth/ws.guard';

@WebSocketGateway(WS_PORT, {
  path: WS_PATH,
  namespace: 'private-chat',

  transports: ['websocket'],
  cors: '*'
})
export class PrivateChatGateway extends BaseGateway {
  protected readonly logger: Logger;

  constructor(protected readonly authService: AuthService, private readonly messagesService: MessagesService) {
    const logger = new Logger(PrivateChatGateway.name)
    super(logger, authService);
    this.logger = logger;
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messagesService.findOne(id);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messagesService.remove(id);
  }

  afterInit(server: Server): void {
    super.afterInit(server);
    this.messagesService.privateChatGatewayServer = server['server'];
  }
}
