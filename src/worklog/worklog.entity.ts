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

  @ManyToOne(() => User, (user) => user.workLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: User;

  @Column()
  date: Date;

  @Column({ type: 'json', nullable: true })
  clockEvent: { clock_in_time: Date; clock_out_time: Date }[];
}
