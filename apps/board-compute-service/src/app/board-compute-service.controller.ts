import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BoardComputeService } from './board-compute-service.service';
import {
  GetBoardsRequest,
  GetBoardsResponse,
  GetBoardsReplayRequest,
  GetBoardsReplayResponse,
  CreateBoardRequest,
  CreateBoardResponse,
} from '../../../generated/board'; 

@Controller()
export class BoardComputeController {
  constructor(private readonly boardComputeService: BoardComputeService) {}

  @GrpcMethod('BoardRequestService', 'GetBoards')
async getBoards(data: GetBoardsRequest): Promise<GetBoardsResponse> {
  const result = await this.boardComputeService.getBoards(
    data.gameId,
    data.numTicks,
    data.lastTick,
    data.userId
  );

  // Map snake_case to camelCase to match protobuf
  return {
    gameId: result.game_id,
    lastTick: result.last_tick,
    boards: result.boards,
  };
}

  @GrpcMethod('BoardRequestService', 'GetBoardsReplay')
  async getBoardsReplay(
    data: GetBoardsReplayRequest,
  ): Promise<GetBoardsReplayResponse> {
    return await this.boardComputeService.getBoardsReplay(data.gameId, data.userId);
  }

  @GrpcMethod('BoardRequestService', 'CreateBoard')
  async createBoard(data: CreateBoardRequest): Promise<CreateBoardResponse> {
    const board = data.board.rows.map((row) => row.cells);
    const result = await this.boardComputeService.createBoard(board, data.userId);

    return {
      gameId: result.game_id,
      lastTick: result.last_tick,
      boards: result.boards,
    };
  }
}
