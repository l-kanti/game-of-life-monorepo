import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../../../shared/entities/board.entity';
import { GameOfLifeService } from './game-of-life.service';
import { v4 as uuidv4 } from 'uuid';

interface BoardGrid {
  rows: Array<{ cells: boolean[] }>;
}

@Injectable()
export class BoardComputeService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    private gameOfLifeService: GameOfLifeService,
  ) {}

  async createBoard(initialGrid: boolean[][], userId: number): Promise<{
    game_id: string;
    last_tick: number;
    boards: BoardGrid[];
  }> {
    const gameId = uuidv4();
    const numTicks = 10;

    // Save initial state (tick 0)
    await this.saveBoardState(gameId, 0, initialGrid, userId);

    // Generate next 10 ticks
    const ticks = this.gameOfLifeService.generateTicks(initialGrid, numTicks);

    // Save all generated ticks
    for (let i = 0; i < ticks.length; i++) {
      await this.saveBoardState(gameId, i + 1, ticks[i], userId);
    }

    return {
      game_id: gameId, 
      last_tick: numTicks,
      boards: ticks.map((grid) => this.convertToProtoGrid(grid)),
    };
  }

  async getBoards(
    gameId: string,
    numTicks: number,
    lastTick: number,
    userId: number
  ): Promise<{
    game_id: string;
    last_tick: number;
    boards: BoardGrid[];
  }> {
    // Get the last known state from the database
    const lastBoard = await this.boardRepository.findOne({
      where: { userId: userId, gameId: gameId.toString(), tick: lastTick },
      order: { tick: 'DESC' },
    });

    if (!lastBoard) {
      throw new Error('Board not found');
    }

    // Generate next ticks from last known state
    const ticks = this.gameOfLifeService.generateTicks(
      lastBoard.grid,
      numTicks,
    );

    // Save all generated ticks
    for (let i = 0; i < ticks.length; i++) {
      await this.saveBoardState(gameId, lastTick + i + 1, ticks[i], userId);
    }

    return {
      game_id: gameId,
      last_tick: lastTick + numTicks,
      boards: ticks.map((grid) => this.convertToProtoGrid(grid)),
    };
  }

  async getBoardsReplay(gameId: string, userId: number): Promise<{
    boards: BoardGrid[];
  }> {
    // Fetch all boards for this game from database
    const boards = await this.boardRepository.find({
      where: { userId: userId, gameId: gameId.toString() },
      order: { tick: 'ASC' },
    });

    return {
      boards: boards.map((board) => this.convertToProtoGrid(board.grid)),
    };
  }

  private async saveBoardState(
    gameId: string,
    tick: number,
    grid: boolean[][],
    userId: number
  ): Promise<void> {
    const board = this.boardRepository.create({
      gameId,
      tick,
      grid,
      userId
    });

    await this.boardRepository.save(board);
  }

  private convertToProtoGrid(grid: boolean[][]): BoardGrid {
    return {
      rows: grid.map((row) => ({ cells: row })),
    };
  }
}
