import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LeaveModule } from './leave/leave.module';
import { WfhModule } from './wfh/wfh.module';
import { WorklogModule } from './worklog/worklog.module';

@Module({
  imports: [UserModule, LeaveModule, WfhModule, WorklogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
