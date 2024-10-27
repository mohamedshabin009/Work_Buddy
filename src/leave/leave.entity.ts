import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'leave_request' })
export class Leave {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.leaves, { onDelete: 'CASCADE' })
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
    enum: ['SICK', 'CASUAL'],
  })
  leaveType: 'SICK' | 'CASUAL';

  @Column({
    type: 'enum',
    enum: ['APPROVED', 'REJECT', 'PENDING'],
    default: 'PENDING',
  })
  status: 'APPROVED' | 'REJECT' | 'PENDING';

  @UpdateDateColumn({ type: 'time without time zone' })
  created_At: Date;
}
