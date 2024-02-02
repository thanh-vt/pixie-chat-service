import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Server } from 'socket.io';

@Injectable()
export class MessagesService {
  get publicChatGatewayServer(): Server {
    return this._publicChatGatewayServer;
  }

  set publicChatGatewayServer(value: Server) {
    this._publicChatGatewayServer = value;
  }
  get privateChatGatewayServer(): Server {
    return this._privateChatGatewayServer;
  }

  set privateChatGatewayServer(value: Server) {
    this._privateChatGatewayServer = value;
  }
  get notificationGatewayServer(): Server {
    return this._notificationGatewayServer;
  }

  set notificationGatewayServer(value: Server) {
    this._notificationGatewayServer = value;
  }
  private readonly logger = new Logger(MessagesService.name);
  private _notificationGatewayServer: Server;
  private _privateChatGatewayServer: Server;
  private _publicChatGatewayServer: Server;

  create(createMessageDto: CreateMessageDto) {
    return 'This action adds a new message';
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  printCurrentClientsCount() {
    this.logger.log(
      `- Current connected clients: 
          + Notification gateway: ${this.notificationGatewayServer.engine.clientsCount}
          + Public chat gateway: ${this.privateChatGatewayServer.engine.clientsCount}
          + Private chat gateway: ${this.publicChatGatewayServer.engine.clientsCount}
        `,
    );
  }
}
