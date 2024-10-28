import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Post('create')
  async createUser(@Body() body: CreateUserDto) {
    console.info(body);

    return await this.userServices.createUser(body);
  }

  @Get('getAllUser')
  async getAllUsers() {
    return await this.userServices.getAll();
  }

  @Get('getUserById/:id')
  async getUserById(@Param('id') id: number) {
    return await this.userServices.getId(id);
  }

  @Put('updateUser/:userId')
  async updateUsers(
    @Body() body: UpdateUserDto,
    @Param('userId') userId: number,
  ) {
    return await this.userServices.updateUser(userId, body);
  }

  @Delete('delete/:userId')
  async deleteUser(@Param('userId') param: number) {
    await this.userServices.clearUser(param);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  }
}
