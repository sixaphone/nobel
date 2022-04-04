import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { ClassMapper } from '@common/mapper/class.mapper';
import { UserDetailsDto } from '@user/dto/user.details.dto';
import { UserEntity } from '@db/entities/user.entity';
import { ApiParam } from '@nestjs/swagger';
import { Auth } from '@common/decorators/auth.decorator';
import { User } from '@common/decorators/user.decorator';

@Controller('/users')
export class UserController {
  constructor(
    private readonly mapper: ClassMapper,
    private readonly userService: UserService,
  ) {}

  @Get()
  @Auth()
  public async listUsers(): Promise<UserDetailsDto[]> {
    const users: UserEntity[] = await this.userService.listUsers();

    return this.mapper.map(users, UserDetailsDto);
  }

  @Get('/:userId')
  @Auth()
  @ApiParam({
    name: 'userId',
    type: String,
  })
  public async getUserById(
    @Param('userId') userId: string,
    @User() authUser: UserEntity,
  ): Promise<UserDetailsDto> {
    const user: UserEntity = await this.userService.getUserById(userId);

    return this.mapper.map(user, UserDetailsDto);
  }
}
