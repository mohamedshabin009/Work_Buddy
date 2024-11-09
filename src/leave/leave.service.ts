import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leave } from './leave.entity';
import { CreateLeaveDto, UpdateLeaveDto } from './leave.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(Leave) private readonly leaveModel: Repository<Leave>,
    private readonly userServices: UserService,
  ) {}

  async createLeave(body: CreateLeaveDto, userId: number) {
    try {
      const user = await this.userServices.getById(userId);
      body['user'] = user;
      return { success: true, leaveCreated: await this.leaveModel.save(body) };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getAllLeave() {
    try {
      const leave = await this.leaveModel.find({ relations: ['user'] });
      return leave;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getLeaveById(id: number) {
    try {
      const leave = await this.leaveModel.findOne({
        where: { id: id },
        relations: ['user'],
      });
      if (!leave) {
        throw new NotFoundException(`No Leave Request in this ${id} id`);
      }
      return leave;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getLeaveRequestsByUserId(id: number) {
    try {
      const user = await this.leaveModel.findOne({
        where: { user: { id: id } },
        relations: ['user'],
      });

      if (!user) {
        throw new NotFoundException('USER NOT FOUND!!!');
      }
      return user;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async updateLeave(id: number, body: UpdateLeaveDto) {
    try {
      const leave = await this.leaveModel.findOne({
        where: { id: id },
      });

      if (!leave)
        throw new NotFoundException(`No Leave Request in this ${id}th ID`);

      await this.leaveModel.update(id, body);

      return {
        Success: true,
        Updated_user: await this.leaveModel.findOne({ where: { id: id } }),
      };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async deleteLeave(id: number) {
    try {
      const leave = await this.leaveModel.delete(id);

      if (leave.affected === 0) {
        throw new NotFoundException(`NOT FOUND !!!`);
      }
      return leave;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }
}
