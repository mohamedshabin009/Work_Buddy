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
import { WorklogService } from './worklog.service';
import { CreateWorkLogDto, UpdateWorkLogDto } from './worklog.dto';

@Controller('worklog')
export class WorklogController {
  constructor(private readonly worklogServices: WorklogService) {}

  @Post('createWorkLog')
  async createWorkLog(
    @Body() body: CreateWorkLogDto,
    @Query() query: { id: number },
  ) {
    console.info(body);
    const check = query.id;
    if (!check) {
      throw new NotFoundException('WRONG QUERY NAME');
    }
    return await this.worklogServices.create_work_log(body, query.id);
  }

  @Get('getAllWorkLog')
  async getAllWorkLog() {
    return await this.worklogServices.getAll();
  }

  @Get('getWorkLogById/:workLogId')
  async getWorkLogById(@Param('workLogId') id: number) {
    return await this.worklogServices.getWorkLogId(id);
  }

  @Put('update/:worklogId')
  async updateWorkLog(
    @Param('worklogId') id: number,
    @Body() body: UpdateWorkLogDto,
  ) {
    console.info(id, body);
    return await this.worklogServices.alterWorkLog(id, body);
  }

  @Delete('delete/:worklogId')
  async deleteWorkLogRequest(@Param('worklogId') param: number) {
    await this.worklogServices.clearWorkLog(param);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  }
}
