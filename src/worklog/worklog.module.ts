import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkLog } from './worklog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkLog])],
})
export class WorklogModule {}
