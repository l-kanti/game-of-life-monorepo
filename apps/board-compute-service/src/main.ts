import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { BoardComputeModule } from './app/board-compute-service.module';


async function bootstrap() {
  console.log('__dirname is:', __dirname);
  console.log('Full path:', resolve(__dirname, 'apps/protos/board.proto'));
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BoardComputeModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'board',
        protoPath: '/app/apps/protos/board.proto',
        url: '0.0.0.0:50052',
      },
    },
  );
  await app.listen();
}

bootstrap();
