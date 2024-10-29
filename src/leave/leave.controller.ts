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

  @Post('createLeave/:userId')
  async createLeave(@Body() body: CreateLeaveDto, @Param('userId') id: number) {
    return await this.leaveServices.createLeave(body, id);
  }

  @Get('getAllLeave')
  async getAllLeave() {
    return this.leaveServices.getAllLeave();
  }

  @Get('getLeaveById')
  async getLeaveById(@Query() query: { id: number }) {
    return await this.leaveServices.getLeaveById(query.id);
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
