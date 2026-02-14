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

  @IsNumber()
  user_id: number;
}

export class CreateBoardDto {
  @IsArray()
  @IsNotEmpty()
  board: boolean[][];

  @IsNumber()
  user_id: number;
}

export class GetReplayDto {
  @IsNotEmpty()
  gameId: string;

  @IsNumber()
  user_id: number;
}

export class BoardsResponseDto {
  gameId: string;
  lastTick: number;
  boards: boolean[][][];
}

export class ReplayResponseDto {
  replay: boolean[][][];
}
