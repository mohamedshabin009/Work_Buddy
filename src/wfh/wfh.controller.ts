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
import { CreateWfhDto, UpdateWfhDto } from './wfh.dto';
import { WfhService } from './wfh.service';

@Controller('wfh')
export class WfhController {
  constructor(private readonly wfhServices: WfhService) {}

  @Post('create/:userId')
  async createWorkFromHome(
    @Body() body: CreateWfhDto,
    @Param('userId') id: number,
  ) {
    return await this.wfhServices.createWorkFromHome(body, id);
  }

  @Get('getAllWFH')
  async getAllWorkFromHome() {
    return await this.wfhServices.getAllWorkFromHome();
  }

  @Get('getWFHById/')
  async getWorkFromHomeById(@Query() query: { id: number }) {
    return await this.wfhServices.getWorkFromHomeById(query.id);
  }

  @Get('getWfhByUserId')
  async getWfhByUserId(@Query() query: { userId: number }) {
    return await this.wfhServices.getWfhByUserId(query.userId);
  }

  @Put('update/WFH/:id')
  async updateWorkFromHome(
    @Param('id') id: number,
    @Body() body: UpdateWfhDto,
  ) {
    return await this.wfhServices.updateWorkFromHome(id, body);
  }

  @Delete('delete/:wfhId')
  async deleteWorkFromHome(@Param('wfhId') id: number) {
    await this.wfhServices.deleteWorkFromHome(id);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  }
}
