import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './schemas/expense.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel(Expense.name) private readonly expenseModel: Model<Expense>, private userService: UsersService) {}
  async create(createExpenseDto: CreateExpenseDto) {
    const user = await this.userService.findById(createExpenseDto.user);
    if(!user) {
      throw new BadRequestException('User does not exist');
    }


    const expense = await this.expenseModel.create(createExpenseDto);

    this.userService.addExpense(user._id, expense._id);

    return await expense.populate('user')
  }

  findAll() {
    return this.expenseModel.find().populate('user');
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
