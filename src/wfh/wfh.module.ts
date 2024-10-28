import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wfh } from './wfh.entity';
import { WfhController } from './wfh.controller';
import { WfhService } from './wfh.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wfh]), UserModule],
  controllers: [WfhController],
  providers: [WfhService],
})
export class WfhModule {}
