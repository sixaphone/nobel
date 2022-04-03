import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClassMapper } from '@common/mapper/class.mapper';
import { BcryptPasswordService } from '@auth/bcrypt-password.service';
import { AuthController } from '@auth/auth.controller';
import { ConfigKey } from '@config/config-key.enum';
import { JwtConfig } from '@config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@db/entities/user.entity';
import { AuthService } from '@auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<JwtConfig>(ConfigKey.JWT),
    }),
  ],
  providers: [BcryptPasswordService, AuthService, ClassMapper],
  exports: [PassportModule, JwtModule, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
