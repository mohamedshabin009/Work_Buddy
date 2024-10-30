import { User } from '../user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'wfh_request' })
export class Wfh {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.wfhs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: User;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  reason: string;

  @Column({
    type: 'enum',
    enum: ['APPROVED', 'REJECT', 'PENDING'],
    default: 'PENDING',
  })
  status: string;

  @UpdateDateColumn({ type: 'time without time zone' })
  created_on: Date;
}
