import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}

  async createUser(create_user: CreateUserDto) {
    try {
      const checkEmail = await this.userModel.findOne({
        where: { email: create_user.email },
      });
      const checkName = await this.userModel.findOne({
        where: { name: create_user.name },
      });

      if (checkEmail || checkName) {
        throw new BadRequestException('User Already Exist with Name or Email');
      }

      const userCreate = await this.userModel.save(create_user);

      return { Success: true, userCreate };
    } catch (err) {
      throw new NotFoundException(err.message || err);
    }
  }

  async getAll() {
    try {
      const checkUser = await this.userModel.find();
      if (checkUser.length === 0) {
        throw new NotFoundException('No Users');
      }
      return checkUser;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getId(param: number) {
    try {
      const checkId = await this.userModel.findOne({ where: { id: param } });
      if (!checkId) {
        throw new NotFoundException('There Is No User');
      }
      return checkId;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async updateUser(userId: number, body: UpdateUserDto) {
    try {
      const checkUserId = await this.userModel.findOne({
        where: { id: userId },
      });
      if (!checkUserId) {
        throw new NotFoundException(`User in this ${userId} ID`);
      }
      const updateUser = await this.userModel.update(userId, body);
      return {
        success: true,
        updateUser: await this.userModel.findOne({ where: { id: userId } }),
      };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async clearUser(param: number) {
    try {
      const deleteUser = await this.userModel.delete(param);

      if (deleteUser.affected === 0) {
        throw new NotFoundException(`User Not Found in this ${param} ID`);
      }
      return deleteUser;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async searchUserName(userName) {
    try {
      const user_name_search = await this.userModel.find({
        where: { name: ILike(`%${userName}%`) },
      });
      if (user_name_search.length === 0) {
        throw new NotFoundException(`No users found with the name ${userName}`);
      }

      return user_name_search;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }
}
