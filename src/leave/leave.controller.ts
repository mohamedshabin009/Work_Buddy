import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto, UpdateLeaveDto } from './leave.dto';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveServices: LeaveService) {}

  @Post('createLeaveRequest')
  async createLeave(
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
  async getAllLeave() {
    return this.leaveServices.getAllLeave();
  }

  @Get('getLeaveRequestById/:id')
  async getLeaveById(@Param('id') id: number) {
    return await this.leaveServices.getLeaveById(id);
  }

  @Put('updateReq/:leaveReqId')
  async updateLeave(
    @Param('leaveReqId') leaveID: number,
    @Body() Body: UpdateLeaveDto,
  ) {
    return await this.leaveServices.updateLeave(leaveID, Body);
  }

  @Delete('delete/:leaveReqId')
  async deleteLeave(@Param('leaveReqId') param: number) {
    await this.leaveServices.deleteLeave(param);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  }
}
