import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    ChatsModule,
    MessagesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
