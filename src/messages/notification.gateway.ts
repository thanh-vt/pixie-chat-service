import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {Server} from "net";

@WebSocketGateway(80, {namespace: 'notification', transports: ['websocket']})
export class NotificationGateway implements OnGatewayInit {

  @WebSocketServer() server: Server;

  afterInit(server: Server): any {
    setInterval(() => {
      this.server.emit('notification', { message: 'Test notification '});
    }, 5000);
  }
}
