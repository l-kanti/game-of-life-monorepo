import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardComputeController } from './board-compute-service.controller';
import { BoardComputeService } from './board-compute-service.service';
import { GameOfLifeService } from './game-of-life.service';
import { Board } from '../../../shared/entities/board.entity';
import { User } from '../../../shared/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Board, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Board, User])],
  controllers: [BoardComputeController],
  providers: [BoardComputeService, GameOfLifeService],
})
export class BoardComputeModule {}
