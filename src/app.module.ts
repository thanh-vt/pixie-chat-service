import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: process.env.MONGO_DB,
    }),
    UsersModule,
    ChatsModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
