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

  @Put('updateReq/:leaveReqId')
  async updateLeaveReq(
    @Param('leaveReqId') leaveID: number,
    @Body() Body: UpdateLeaveDto,
  ) {
    return await this.leaveServices.updateReq(leaveID, Body);
  }

  @Delete('delete/:leaveReqId')
  async deleteLeaveRequest(@Param('leaveReqId') param: number) {
    await this.leaveServices.clearLeaveReq(param);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  }
}
