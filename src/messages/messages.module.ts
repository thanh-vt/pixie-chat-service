import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { NotificationGateway } from './notification.gateway';
import { PublicChatGateway } from './public-chat.gateway';
import { PrivateChatGateway } from './private-chat.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule
  ],
  providers: [
    MessagesService,
    NotificationGateway,
    PublicChatGateway,
    PrivateChatGateway,

  ],
})
export class MessagesModule {}
