import { Leave } from 'src/leave/leave.entity';
import { Wfh } from 'src/wfh/wfh.entity';
import { WorkLog } from 'src/worklog/worklog.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_details' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['EMPLOYEE', 'MANAGER'],
  })
  role: 'EMPLOYEE' | 'MANAGER';

  @Column({ unique: true })
  email: string;

  @Column()
  mobileNumber: string;

  @Column()
  profileImage: string;

  @OneToMany(() => Leave, (leave) => leave.user)
  leaves: Leave[];

  @OneToMany(() => Wfh, (wfh) => wfh.user)
  wfhs: Wfh[];

  @OneToMany(() => WorkLog, (workLog) => workLog.user)
  workLogs: WorkLog[];
}
