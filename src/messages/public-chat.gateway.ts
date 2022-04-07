import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(80, { namespace: 'public-chat', transports: ['websocket'] })
export class PublicChatGateway {
  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): WsResponse<unknown> {
    console.log(client, payload);
    return {
      event: payload.to,
      data: `Hello ${payload.to}, my name is ${payload.from}!`,
    };
  }
}
