import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpStatus,
  HttpException,
  Logger
} from '@nestjs/common';
import { BoardRequestService } from './board-request-service.service';
import {
  CreateBoardDto,
  GetBoardsDto,
  GetReplayDto,
  BoardsResponseDto,
  ReplayResponseDto,
} from '../dto/board.dto';

@Controller()
export class BoardRequestController {
  private readonly logger = new Logger(BoardRequestController.name);
  constructor(private readonly boardRequestService: BoardRequestService) {}

  @Post('board')
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<BoardsResponseDto> {
    try {
      return await this.boardRequestService.createBoard(createBoardDto.board);
    } catch (error) {
      this.logger.error('Error creating this board', error.stack);
      
      if (error.status === HttpStatus.FORBIDDEN) {
        this.logger.error('Error creating board', error.stack); // ← Built-in pretty printing
      }
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('board')
  async getBoards(@Query() getBoardsDto: GetBoardsDto): Promise<BoardsResponseDto> {
    try {
      return await this.boardRequestService.getBoards(
        getBoardsDto.gameId,
        getBoardsDto.ticks,
        getBoardsDto.last_tick,
      );
    } catch (error) {
      this.logger.error('Error getting board', error.stack);
      
      if (error.status === HttpStatus.FORBIDDEN) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('replays/board')
  async getReplay(@Query() getReplayDto: GetReplayDto): Promise<ReplayResponseDto> {
    try {
      return await this.boardRequestService.getReplay(getReplayDto.gameId);
    } catch (error) {
      this.logger.error('Error getting replay', error.stack);
      
      if (error.status === HttpStatus.FORBIDDEN) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
