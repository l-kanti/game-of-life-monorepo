import { IsNumber, IsArray, IsNotEmpty, Min, Max } from 'class-validator';

export class GetBoardsDto {
  @IsNotEmpty()
  gameId: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  ticks: number;

  @IsNumber()
  @Min(1)
  last_tick: number;
}

export class CreateBoardDto {
  @IsArray()
  @IsNotEmpty()
  board: boolean[][];
}

export class GetReplayDto {
  @IsNotEmpty()
  gameId: string;
}

export class BoardsResponseDto {
  gameId: string;
  lastTick: number;
  boards: boolean[][][];
}

export class ReplayResponseDto {
  replay: boolean[][][];
}
