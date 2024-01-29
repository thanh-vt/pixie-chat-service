import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { WS_PATH, WS_PORT } from '../app.config';

@WebSocketGateway(WS_PORT, {
  path: WS_PATH,
  namespace: 'public-chat',
  transports: ['polling', 'websocket'],
})
export class PublicChatGateway {
  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): WsResponse<unknown> {
    Logger.log(client, payload);
    return {
      event: payload.to,
      data: `Hello ${payload.to}, my name is ${payload.from}!`,
    };
  }
}
