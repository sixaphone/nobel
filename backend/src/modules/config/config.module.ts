import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import jwt from './jwt.config';
import database from './database.config';
import app from './app.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      load: [jwt, database, app],
    }),
  ],
})
export class ConfigModule {}
