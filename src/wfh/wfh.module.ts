import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wfh } from './wfh.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wfh])],
})
export class WfhModule {}
