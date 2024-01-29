import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { EntityConstant } from '../constant/entity-constant';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel({
      ...createUserDto,
      createDate: new Date(),
      status: EntityConstant.VISIBLE,
    });
    return createdUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: number) {
    return this.userModel.findById(id).exec();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id).exec();
    if (user) {
      return await user
        .updateOne({
          ...updateUserDto,
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
    const user = await this.userModel.findById(id).exec();
    if (user) {
      return await user.deleteOne();
    } else
      throw new NotFoundException({
        message: `User id #${id} is not found`,
      });
  }
}
