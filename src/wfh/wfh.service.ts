import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Wfh } from './wfh.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWfhDto, UpdateWfhDto } from './wfh.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class WfhService {
  constructor(
    @InjectRepository(Wfh) private readonly wfhModel: Repository<Wfh>,
    private readonly userServices: UserService,
  ) {}

  async createWorkFromHome(body: CreateWfhDto, userId: number) {
    try {
      const user = await this.userServices.getById(userId);
      body['user'] = user;
      const workFromHome = await this.wfhModel.save(body);
      return { Success: true, workFromHome };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getAllWorkFromHome() {
    try {
      const workFromHome = await this.wfhModel.find({ relations: ['user'] });
      return workFromHome;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getWorkFromHomeById(id: number) {
    try {
      const workFromHome = await this.wfhModel.findOne({
        where: { id: id },
        relations: ['user'],
      });
      if (!workFromHome) {
        throw new NotFoundException(
          `No WORK FROM HOME Request from this ${id}th ID `,
        );
      }
      return workFromHome;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getWfhByUserId(id: number) {
    try {
      const user = await this.wfhModel.find({
        where: { user: { id } },
        relations: ['user'],
      });
      if (!user) throw new NotFoundException('USER NOT FOUND!!!');
      return user;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async updateWorkFromHome(id: number, body: UpdateWfhDto) {
    const workFromHome = await this.wfhModel.findOne({ where: { id: id } });
    if (!workFromHome) {
      throw new NotFoundException(`No WFH Request in this ${id} ID`);
    }

    await this.wfhModel.update(id, body);
    return {
      Success: true,
      workFromHomeUpdated: await this.wfhModel.findOne({ where: { id: id } }),
    };
  }

  async deleteWorkFromHome(id: number) {
    try {
      const workFromHome = await this.wfhModel.delete(id);

      if (workFromHome.affected === 0) {
        throw new NotFoundException(`NOT FOUND !!!`);
      }
      return workFromHome;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }
}
