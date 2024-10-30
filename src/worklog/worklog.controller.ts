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
import { WorklogService } from './worklog.service';
import { CreateWorkLogDto, UpdateWorkLogDto } from './worklog.dto';

@Controller('workLog')
export class WorklogController {
  constructor(private readonly worklogServices: WorklogService) {}

  @Post('createWorkLog/:userId')
  async createWorkLog(
    @Body() body: CreateWorkLogDto,
    @Param('userId') id: number,
  ) {
    return await this.worklogServices.createWorkLog(body, id);
  }

  @Get('getAllWorkLog')
  async getAllWorkLog() {
    return await this.worklogServices.getAll();
  }

  @Get('getWorkLogById')
  async getWorkLogById(@Query() query: { id: number }) {
    return await this.worklogServices.getWorkLogId(query.id);
  }

  @Get('getWorkLogsByUserId')
  async getWorkLogsByUserId(@Query() query: { id: number }) {
    return await this.worklogServices.getWorkLogsByUserId(query.id);
  }

  @Put('update/:worklogId')
  async updateWorkLog(
    @Param('worklogId') id: number,
    @Body() body: UpdateWorkLogDto,
  ) {
    console.info(id, body);
    return await this.worklogServices.updateWorkLog(id, body);
  }

  @Delete('delete/:worklogId')
  async deleteWorkLog(@Param('worklogId') id: number) {
    await this.worklogServices.deleteWorkLog(id);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  }
}
