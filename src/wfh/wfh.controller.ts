import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateWfhDto } from './wfh.dto';
import { WfhService } from './wfh.service';

@Controller('wfh')
export class WfhController {
  constructor(private readonly wfhServices: WfhService) {}

  @Post('create/Wfh')
  async createWfh(@Body() body: CreateWfhDto, @Query() query: { id: number }) {
    const checkId = query.id;

    if (!checkId) throw new NotFoundException('Wrong Query Name');
    return await this.wfhServices.createWorkFromHome(body, query.id);
  }

  @Get('getAllWFHRequest')
  async getAllWFHRequest() {
    return await this.wfhServices.getAllWfhReq();
  }

  @Get('getWFHRequestById/:requestId')
  async getWFHRequestById(@Param('requestId') param: number) {
    return await this.wfhServices.getReqById(param);
  }
}
