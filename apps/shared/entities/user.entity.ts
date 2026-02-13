import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
  } from 'typeorm';
  
  @Entity('users')
  @Index(['username', 'password'])
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar'})
    username: string;
  
    @Column({ type: 'varchar' })
    password: string;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  