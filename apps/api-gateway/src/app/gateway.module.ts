import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { AuthService } from '../guards/auth/auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'apps/shared/entities/user.entity';

@Module({
  imports: [
    HttpModule, 
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [GatewayController],
  providers: [AuthService]
})
export class GatewayModule {}
