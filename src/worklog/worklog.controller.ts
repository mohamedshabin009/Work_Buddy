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
//give proper naming conventation
@Controller('worklog')
export class WorklogController {
  constructor(private readonly worklogServices: WorklogService) {}

  @Post('createWorkLog')
  async createWorkLog(
    @Body() body: CreateWorkLogDto,
    //use params
    @Query() query: { id: number },
  ) {
    const check = query.id;
    if (!check) {
      throw new NotFoundException('WRONG QUERY NAME');
    }
    //give proper naming conventation

    return await this.worklogServices.createWorkLog(body, query.id);
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
