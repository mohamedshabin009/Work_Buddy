import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkLog } from './worklog.entity';
import { WorklogController } from './worklog.controller';
import { WorklogService } from './worklog.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkLog]), UserModule],
  controllers: [WorklogController],
  providers: [WorklogService],
})
export class WorklogModule {}
