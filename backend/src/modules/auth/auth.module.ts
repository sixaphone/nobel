import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClassMapper } from '@common/mapper/class.mapper';
import { BcryptPasswordService } from '@auth/bcrypt-password.service';
import { AuthController } from '@auth/auth.controller';
import { ConfigKey } from '@config/config-key.enum';
import { JwtConfig } from '@config/jwt.config';

@Module({
  imports: [
    ClassMapper,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<JwtConfig>(ConfigKey.JWT),
    }),
  ],
  providers: [BcryptPasswordService],
  exports: [PassportModule, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
