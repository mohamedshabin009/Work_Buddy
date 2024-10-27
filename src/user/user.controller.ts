import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

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
}
