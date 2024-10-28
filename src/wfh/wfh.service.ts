import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Wfh } from './wfh.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWfhDto } from './wfh.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WfhService {
  constructor(
    @InjectRepository(Wfh) private readonly wfhModel: Repository<Wfh>,
    private readonly userServices: UserService,
  ) {}

  async createWorkFromHome(body: CreateWfhDto, userId: number) {
    try {
      const _user = await this.userServices.getId(userId);
      body['user'] = _user;
      const _body = await this.wfhModel.save(body);
      return { Success: true, _body };
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getAllWfhReq() {
    try {
      const getAllReq = await this.wfhModel.find({ relations: ['user'] });

      if (getAllReq.length === 0)
        throw new NotFoundException('There Is No Work From Home Request');
      return getAllReq;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  async getReqById(ReqId: number) {
    try {
      const checkReqId = await this.wfhModel.findOne({
        where: { id: ReqId },
        relations: ['user'],
      });
      if (!checkReqId) {
        throw new NotFoundException(
          `No WORK FROM HOME Request from this ${ReqId}th ID `,
        );
      }
      return checkReqId;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }
}
