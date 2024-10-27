import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('work_log')
export class WorkLog {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.workLogs)
  @JoinColumn({ name: 'user' })
  user: User;

  @Column()
  date: Date;

  @Column('json', { array: true })
  clockEvent: { clock_in_time: Date; clock_out_time: Date }[];
}
