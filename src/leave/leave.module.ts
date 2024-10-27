import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leave } from './leave.entity';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Leave]), UserModule],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
