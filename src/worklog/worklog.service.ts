import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkLog } from './worklog.entity';
import { Repository } from 'typeorm';
import { CreateWorkLogDto, UpdateWorkLogDto } from './worklog.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class WorklogService {
  constructor(
    @InjectRepository(WorkLog)
    private readonly worklogModel: Repository<WorkLog>,
    private readonly userServices: UserService,
  ) {}

  async createWorkLog(body: CreateWorkLogDto, userId: number) {
    try {
      const user = await this.userServices.getById(userId);
      body['user'] = user;
      return await this.worklogModel.save(body);
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getAll() {
    try {
      const getAllWorkLogs = await this.worklogModel.find();
      // if (getAllWorkLogs.length === 0) {
      //   throw new NotFoundException('NO WORK LOGS');
      // }
      return { success: true, getAllWorkLogs };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getWorkLogId(workId: number) {
    try {
      const work = await this.worklogModel.findOne({
        where: { id: workId },
        relations: ['user'],
      });
      if (!work) {
        throw new NotFoundException(`No Work LOG ${workId}th ID`);
      }

      return { success: true, work };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getWorkLogsByUserId(id: number) {
    const user = await this.worklogModel.findOne({
      where: { user: { id } },
      relations: ['user'],
    });
    if (!user) {
      throw new NotFoundException('USER NOT FOUND');
    }

    return user;
  }

  //give proper naming conventation

  async updateWorkLog(id: number, body: UpdateWorkLogDto) {
    const work = await this.worklogModel.findOne({ where: { id: id } });
    if (!work) {
      throw new NotFoundException(`No WorkLog in this ${id} ID`);
    }

    await this.worklogModel.update(id, body);

    return {
      success: true,
      workLog: await this.worklogModel.findOne({
        where: { id: id },
      }),
    };
  }

  async deleteWorkLog(id: number) {
    try {
      const deleteWorkLog = await this.worklogModel.delete(id);

      if (deleteWorkLog.affected === 0) {
        throw new NotFoundException(`NOT FOUND !!!`);
      }
      return deleteWorkLog;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }
}
