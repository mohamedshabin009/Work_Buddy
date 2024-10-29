import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Post('register')
  async createUser(@Body() body: CreateUserDto) {
    return await this.userServices.createUser(body);
  }

  @Get('getAllUser')
  async getAllUsers() {
    return await this.userServices.getAll();
  }

  @Get('getUserById')
  async getUserById(@Query() query: { id: number }) {
    return await this.userServices.getById(query.id);
  }

  @Put('updateUser/:userId')
  async updateUser(
    @Body() body: UpdateUserDto,
    @Param('userId') userId: number,
  ) {
    return await this.userServices.updateUser(userId, body);
  }

  @Delete('delete/:userId')
  async deleteUser(@Param('userId') param: number) {
    await this.userServices.deleteUser(param);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  }

  @Get('search/user')
  async searchUser(@Query() query: { name: string }) {
    return await this.userServices.searchUserName(query.name);
  }
}
