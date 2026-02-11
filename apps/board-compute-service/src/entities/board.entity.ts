import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
