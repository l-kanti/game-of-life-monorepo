import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { BoardRequestController } from './board-request-service.controller';
import { BoardRequestService } from './board-request-service.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOARD_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'board',
          protoPath: resolve('protos/board.proto'),
          url: 'board-compute-service:50052',
        },
      },
    ]),
  ],
  controllers: [BoardRequestController],
  providers: [BoardRequestService],
})
export class BoardRequestModule {}