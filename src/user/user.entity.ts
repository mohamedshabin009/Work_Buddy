import { Leave } from '../leave/leave.entity';
import { Wfh } from '../wfh/wfh.entity';
import { WorkLog } from '../worklog/worklog.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

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

  // @BeforeInsert()
  // async beforeInsert() {
  //   if (this.password) {
  //     try {
  //       this.password = await bcrypt.hash(this.password, 10);
  //     } catch (error) {
  //       console.error('Error hashing password:', error);
  //       throw new Error('Failed to hash password');
  //     }
  //   }
  // }
}
