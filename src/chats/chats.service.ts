import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat, ChatDocument } from './entities/chat.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { EntityConstant } from '../constant/entity-constant';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async create(createChatDto: CreateChatDto) {
    const createdChat = new this.chatModel({
      ...createChatDto,
      createDate: new Date(),
      status: EntityConstant.VISIBLE,
    });
    return createdChat.save();
  }

  async findAll() {
    return this.chatModel.find().exec();
  }

  async findOne(id: number) {
    return this.chatModel.findById(id).exec();
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const chat = await this.chatModel.findById(id).exec();
    if (chat) {
      return await chat.updateOne
        ({
          ...updateChatDto,
          id,
          updateDate: new Date(),
        })
        .exec();
    } else
      throw new NotFoundException({
        message: `Chat id #${id} is not found`,
      });
  }

  async remove(id: number) {
    const chat = await this.chatModel.findById(id).exec();
    if (chat) {
      return await chat.deleteOne();
    } else
      throw new NotFoundException({
        message: `Chat id #${id} is not found`,
      });
  }
}
