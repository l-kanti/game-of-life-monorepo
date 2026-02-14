import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Logger,
  BadRequestException
} from '@nestjs/common';
import { BoardRequestService } from './board-request-service.service';
import {
  CreateBoardDto,
  GetBoardsDto,
  GetReplayDto,
  BoardsResponseDto,
  ReplayResponseDto,
} from '../../../shared/dto/board.dto';

@Controller()
export class BoardRequestController {
  private readonly logger = new Logger(BoardRequestController.name);
  constructor(private readonly boardRequestService: BoardRequestService) {}

  @Post('boards')
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<BoardsResponseDto> {
    if (!createBoardDto.board) {
      throw new BadRequestException;
    }
    try {
      return await this.boardRequestService.createBoard(createBoardDto.board, createBoardDto.user_id);
    } catch (error) {
      this.logger.error('Error creating this board', error.stack);
      
      if (error.status === HttpStatus.FORBIDDEN) {
        this.logger.error('Error creating board', error.stack); 
      }
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('boards/retrieve')
  async getBoards(
    @Body() getBoardsDto: GetBoardsDto): Promise<BoardsResponseDto> {
    if (!getBoardsDto.gameId || !getBoardsDto.last_tick || !getBoardsDto.ticks) {
      throw new BadRequestException;
    }
    try {
      return await this.boardRequestService.getBoards(
        getBoardsDto.gameId,
        getBoardsDto.ticks,
        getBoardsDto.last_tick,
        getBoardsDto.user_id
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

  @Post('replays/boards/retrieve')
  async getReplay(@Body() getReplayDto: GetReplayDto): Promise<ReplayResponseDto> {
    if (!getReplayDto.gameId) {
      throw new BadRequestException;
    }
    try {
      return await this.boardRequestService.getReplay(getReplayDto.gameId, getReplayDto.user_id);
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
