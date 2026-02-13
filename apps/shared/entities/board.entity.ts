import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { User } from './user.entity';

@Entity('boards')
@Index(['gameId', 'tick'])
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'game_id', type: 'uuid' })
  gameId: string;

  @Column({ type: 'integer' })
  tick: number;

  @Column({ type: 'jsonb' })
  grid: boolean[][];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', type: 'integer'})
  userId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
