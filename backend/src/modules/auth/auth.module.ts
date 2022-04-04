import { Module } from '@nestjs/common';
import { ClassMapper } from '@common/mapper/class.mapper';
import { BcryptPasswordService } from '@auth/bcrypt-password.service';
import { AuthController } from '@auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@db/entities/user.entity';
import { AuthService } from '@auth/auth.service';
import { JwtModule } from '@jwt/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule],
  providers: [BcryptPasswordService, AuthService, ClassMapper],
  controllers: [AuthController],
})
export class AuthModule {}
