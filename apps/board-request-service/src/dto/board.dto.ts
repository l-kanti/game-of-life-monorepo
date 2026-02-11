import { IsNumber, IsArray, IsNotEmpty, Min, Max } from 'class-validator';

export class GetBoardsDto {
  @IsNumber()
  @IsNotEmpty()
  gameId: number;

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
  @IsNumber()
  @IsNotEmpty()
  gameId: number;
}

export class BoardsResponseDto {
  gameId: number;
  lastTick: number;
  boards: boolean[][][];
}

export class ReplayResponseDto {
  replay: boolean[][][];
}
