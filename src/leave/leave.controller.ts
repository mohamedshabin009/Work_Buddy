import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './leave.dto';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveServices: LeaveService) {}

  @Post('createLeaveRequest')
  async createLeaveRequest(
    @Body() body: CreateLeaveDto,
    @Query() userId: { id: number },
  ) {
    const _userId = userId.id;

    if (!_userId) {
      throw new NotFoundException('Wrong Query Name');
    }
    return await this.leaveServices.createLeave(body, userId.id);
  }

  @Get('getAllLeaveRequest')
  async getAllLeaveReq() {
    return this.leaveServices.getAllLeave();
  }

  @Get('getLeaveRequestById/:id')
  async getLeaveRequestById(@Param('id') id: number) {
    return await this.leaveServices.getLeaveReqById(id);
  }
}
