import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';

type ObjectId = mongoose.Schema.Types.ObjectId

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({email: createUserDto.email});
    if (existingUser) {
      throw new Error('User already exists');
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().populate('expenses');
  }

  findById(id: ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({email}).select(['email', 'password']);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async addExpense(userId: ObjectId, expenseId: ObjectId): Promise<void> {
    const user = await this.userModel.findById(userId);
    user.expenses.push(expenseId);
    await user.save();
  }
}
