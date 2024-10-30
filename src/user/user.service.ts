import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}

  async createUser(body: CreateUserDto) {
    try {
      //use one query
      const check = await this.userModel.findOne({
        where: [{ email: body.email }, { name: body.name }],
      });

      if (check) {
        throw new BadRequestException('User Already Exist with Name or Email');
      }
      body['password'] = await bcrypt.hash(body.password, 10);
      const user = await this.userModel.save(body);

      return { Success: true, user };
    } catch (err) {
      throw new NotFoundException(err.message || err);
    }
  }

  async getAll() {
    try {
      const user = await this.userModel.find();
      if (user.length === 0) {
        throw new NotFoundException('No Users');
      }
      return user;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getById(param: number) {
    try {
      const user = await this.userModel.findOne({ where: { id: param } });
      if (!user) {
        throw new NotFoundException('There Is No User');
      }
      return user;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async updateUser(id: number, body: UpdateUserDto) {
    try {
      const check = await this.userModel.findOne({
        where: { id: id },
      });
      if (!check) {
        throw new NotFoundException(`User in this ${id} ID`);
      }
      await this.userModel.update(id, body);
      return {
        success: true,
        updateUser: await this.userModel.findOne({ where: { id: id } }),
      };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async deleteUser(id: number) {
    try {
      const deleteUser = await this.userModel.delete(id);

      if (deleteUser.affected === 0) {
        throw new NotFoundException(`User Not Found in this ${id} ID`);
      }
      return deleteUser;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async searchUserName(userName: string) {
    try {
      const user = await this.userModel.find({
        where: { name: ILike(`%${userName}%`) },
      });
      if (user.length === 0) {
        throw new NotFoundException(`No users found with the name ${userName}`);
      }

      return user;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }
}
