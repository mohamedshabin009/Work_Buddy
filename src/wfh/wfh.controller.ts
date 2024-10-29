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
import { CreateWfhDto, UpdateWfhDto } from './wfh.dto';
import { WfhService } from './wfh.service';

@Controller('wfh')
export class WfhController {
  constructor(private readonly wfhServices: WfhService) {}

  @Post('create')
  //use params
  async createWorkFromHome(
    @Body() body: CreateWfhDto,
    @Query() query: { id: number },
  ) {
    const checkId = query.id;

    if (!checkId) throw new NotFoundException('Wrong Query Name');
    return await this.wfhServices.createWorkFromHome(body, query.id);
  }

  @Get('getAllWFH')
  async getAllWorkFromHome() {
    return await this.wfhServices.getAllWorkFromHome();
  }

  @Get('getWFHRequestById/:id')
  async getWorkFromHomeById(@Param('id') id: number) {
    return await this.wfhServices.getWorkFromHomeById(id);
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
