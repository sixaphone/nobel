import { Body, Controller, Injectable } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { LoginDto } from '@auth/dto/login.dto';
import { AuthDetailsDto } from '@auth/dto/auth.details.dto';
import { ClassMapper } from '../../common/mapper/class.mapper';
import { UserEntity } from '../../entities/user.entity';

@Controller()
export class AuthController {
  constructor(private mapper: ClassMapper, private auth: AuthService) {}

  public async login(@Body() payload: LoginDto): Promise<AuthDetailsDto> {
    const user: AuthDetailsDto = await this.auth.validate(
      payload.email,
      payload.password,
    );

    return this.mapper.map(user, AuthDetailsDto);
  }
}
