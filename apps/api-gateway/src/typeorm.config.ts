import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'apps/shared/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'boards',
  entities: [User],
  synchronize: process.env.NODE_ENV !== 'production', // Auto-sync in dev only
  logging: process.env.NODE_ENV !== 'production',
};
