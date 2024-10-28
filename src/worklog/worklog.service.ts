import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkLog } from './worklog.entity';
import { Repository } from 'typeorm';
import { CreateWorkLogDto } from './worklog.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WorklogService {
  constructor(
    @InjectRepository(WorkLog)
    private readonly worklogModel: Repository<WorkLog>,
    private readonly userServices: UserService,
  ) {}

  async create_work_log(body: CreateWorkLogDto, userId: number) {
    try {
      const user = await this.userServices.getId(userId);
      body['user'] = user;
      return await this.worklogModel.save(body);
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getAll() {
    try {
      const getAllWorkLogs = await this.worklogModel.find();
      if (getAllWorkLogs.length === 0) {
        throw new NotFoundException('NO WORK LOGS');
      }
      return { Success: true, getAllWorkLogs };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getWorkLogId(workId: number) {
    try {
      const checkWorkId = await this.worklogModel.findOne({
        where: { id: workId },
        relations: ['user'],
      });
      if (!checkWorkId) {
        throw new NotFoundException(`No Work LOG ${workId}th ID`);
      }

      return { Success: true, checkWorkId };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }
}
