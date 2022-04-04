import { Module } from '@nestjs/common';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassMapper } from '@common/mapper/class.mapper';
import { UserEntity } from '@db/entities/user.entity';
import { JwtModule } from '@jwt/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule],
  controllers: [UserController],
  providers: [UserService, ClassMapper],
})
export class UserModule {}
