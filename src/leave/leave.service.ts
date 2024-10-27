import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leave } from './leave.entity';
import { CreateLeaveDto } from './leave.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(Leave) private readonly leaveModel: Repository<Leave>,
    private readonly userServices: UserService,
  ) {}

  async createLeave(body: CreateLeaveDto, userId: number) {
    try {
      const user = await this.userServices.getId(userId);
      body['user'] = user;
      return { Success: true, leaveRequest: await this.leaveModel.save(body) };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getAllLeave() {
    const check = await this.leaveModel.find({ relations: ['user'] });

    if (check.length === 0) {
      throw new NotFoundException('No Leave Request');
    }
    return check;
  }

  async getLeaveReqById(leaveId: number) {
    try {
      const checkId = await this.leaveModel.findOne({
        where: { id: leaveId },
        relations: ['user'],
      });
      if (!checkId) {
        throw new NotFoundException(`No Leave Request in this ${leaveId}th id`);
      }
      return checkId;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }
}