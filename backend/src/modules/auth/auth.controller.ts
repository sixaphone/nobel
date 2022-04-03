import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { LoginDto } from '@auth/dto/login.dto';
import { AuthDetailsDto } from '@auth/dto/auth.details.dto';
import { ClassMapper } from '@common/mapper/class.mapper';
import { UserEntity } from '@db/entities/user.entity';
import { RegisterDto } from '@auth/dto/register.dto';

@Controller()
export class AuthController {
  constructor(private mapper: ClassMapper, private auth: AuthService) {}

  @Post('/login')
  public async login(@Body() payload: LoginDto): Promise<AuthDetailsDto> {
    const user: UserEntity = await this.auth.validate(
      payload.email,
      payload.password,
    );

    return this.toDetails(user);
  }

  @Post('/register')
  public async register(@Body() payload: RegisterDto): Promise<AuthDetailsDto> {
    const user: UserEntity = await this.auth.register(payload);

    return this.toDetails(user);
  }

  private async toDetails(user: UserEntity): Promise<AuthDetailsDto> {
    const accessToken: string = await this.auth.sign(user);

    return this.mapper.map(user, AuthDetailsDto, (details: AuthDetailsDto) => {
      details.accessToken = accessToken;

      return details;
    });
  }
}
