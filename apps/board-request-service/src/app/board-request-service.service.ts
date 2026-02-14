import { Injectable, HttpException, HttpStatus, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { BoardsResponseDto, ReplayResponseDto } from '../../../shared/dto/board.dto';
import {
  BoardRequestServiceClient,
  GetBoardsRequest,
  GetBoardsResponse,
  GetBoardsReplayRequest,
  GetBoardsReplayResponse,
  CreateBoardRequest,
  CreateBoardResponse,
  BoardGrid,
} from '../../../generated/board'; 

@Injectable()
export class BoardRequestService implements OnModuleInit {
  private readonly logger = new Logger(BoardRequestService.name);
  private boardComputeService: BoardRequestServiceClient; 

  constructor(
    @Inject('BOARD_PACKAGE') private client: ClientGrpc, 
  ) {}

  onModuleInit() {
    this.boardComputeService = this.client.getService<BoardRequestServiceClient>(
      'BoardRequestService',
    );
  }

  async createBoard(board: boolean[][], userId: number): Promise<BoardsResponseDto> {
    try {
      const boardGrid = this.convertToProtoGrid(board);

      const request: CreateBoardRequest = { board: boardGrid, userId: userId };

      const response: CreateBoardResponse = await firstValueFrom(
        this.boardComputeService.createBoard(request),
      );

      console.log(`Response gameId: ${response.gameId}`);

      return {
        gameId: response.gameId,
        lastTick: response.lastTick,
        boards: this.convertProtoGridsToArrays(response.boards),
      };
    } catch (error) {
      this.logger.log(error);
      throw new HttpException(
        'Failed to create board',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBoards(
    gameId: string,
    ticks: number,
    lastTick: number,
    userId: number
  ): Promise<BoardsResponseDto> {
    try {
      const request: GetBoardsRequest = {
        gameId: gameId,
        numTicks: ticks,
        lastTick: lastTick,
        userId: userId
      };
      //debugging
      console.log(`Request for getBoards-- game id: ${request.gameId} \n numTicks: ${request.numTicks} \n lastTick: ${lastTick}`);

      const response: GetBoardsResponse = await firstValueFrom(
        this.boardComputeService.getBoards(request),
      );

      console.log(`Response from getBoards computeService: ${response.boards}`);

      return {
        gameId: response.gameId,
        lastTick: response.lastTick,
        boards: this.convertProtoGridsToArrays(response.boards),
      };
    } catch (error) {
      this.logger.log(error);
      throw new HttpException(
        'Failed to get boards',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getReplay(gameId: string, userId: number): Promise<ReplayResponseDto> {
    try {
      const request: GetBoardsReplayRequest = { gameId: gameId, userId: userId };
      
      const response: GetBoardsReplayResponse = await firstValueFrom(
        this.boardComputeService.getBoardsReplay(request),
      );

      return {
        replay: this.convertProtoGridsToArrays(response.boards),
      };
    } catch (error) {
      this.logger.log(error);
      throw new HttpException(
        'Failed to get replay',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private convertToProtoGrid(board: boolean[][]): BoardGrid {
    return {
      rows: board.map((row) => ({ cells: row })),
    };
  }

  private convertProtoGridsToArrays(grids: BoardGrid[]): boolean[][][] {
    return grids.map((grid) => grid.rows.map((row) => row.cells));
  }
}