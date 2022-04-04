import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from '@config/config-key.enum';
import { JwtConfig } from '@config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@db/entities/user.entity';
import { JwtAuthGuard } from './auth.guard';
import { JwtStrategy } from '@jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    NestJwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<JwtConfig>(ConfigKey.JWT),
    }),
  ],
  providers: [JwtAuthGuard, JwtStrategy],
  exports: [JwtAuthGuard, NestJwtModule],
})
export class JwtModule {}
