import { Body, ForbiddenException } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { LoginDto } from '@auth/dto/login.dto';
import { AuthDetailsDto } from '@auth/dto/auth.details.dto';
import { ClassMapper } from '@common/mapper/class.mapper';
import { UserEntity } from '@db/entities/user.entity';
import { RegisterDto } from '@auth/dto/register.dto';
import { Auth } from '@common/decorators/auth.decorator';
import { ACCESSIBLE_TYPES, UserType } from '@user/user-type.enum';
import { ApiPost } from '@common/decorators/api.post.decorator';
import { ApiController } from '@common/decorators/api.controller.decorator';
import { User } from '@common/decorators/user.decorator';

@ApiController('', 'Auth')
export class AuthController {
  constructor(private mapper: ClassMapper, private auth: AuthService) {}

  @ApiPost('/login', { responseType: AuthDetailsDto })
  public async login(@Body() payload: LoginDto): Promise<AuthDetailsDto> {
    const user: UserEntity = await this.auth.validate(
      payload.email,
      payload.password,
    );

    return this.toDetails(user);
  }

  @ApiPost('/register', { responseType: AuthDetailsDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  public async register(
    @User() user: UserEntity,
    @Body() payload: RegisterDto,
  ): Promise<AuthDetailsDto> {
    if (!ACCESSIBLE_TYPES[user.type].includes(payload.type)) {
      throw new ForbiddenException('Cannot assign that role to user');
    }

    const registeredUser: UserEntity = await this.auth.register(payload);

    return this.toDetails(registeredUser);
  }

  private async toDetails(user: UserEntity): Promise<AuthDetailsDto> {
    const accessToken: string = await this.auth.sign(user);

    return this.mapper.map(user, AuthDetailsDto, (details: AuthDetailsDto) => {
      details.accessToken = accessToken;

      return details;
    });
  }
}
