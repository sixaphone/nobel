import { Param } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { ClassMapper } from '@common/mapper/class.mapper';
import { UserDetailsDto } from '@user/dto/user.details.dto';
import { UserEntity } from '@db/entities/user.entity';
import { ApiParam } from '@nestjs/swagger';
import { Auth } from '@common/decorators/auth.decorator';
import { ApiGet } from '@common/decorators/api.get.decorator';
import { ACCESSIBLE_TYPES, UserType } from '@user/user-type.enum';
import { ApiController } from '@common/decorators/api.controller.decorator';
import { User } from '@common/decorators/user.decorator';

@ApiController('/users', 'Users')
export class UserController {
  constructor(
    private readonly mapper: ClassMapper,
    private readonly userService: UserService,
  ) {}

  @ApiGet('/', { responseType: [UserDetailsDto] })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  public async listUsers(@User() user: UserEntity): Promise<UserDetailsDto[]> {
    const users: UserEntity[] = await this.userService.listUsers({
      withDeleted: user.type === UserType.ADMIN,
      types: ACCESSIBLE_TYPES[user.type],
    });

    return this.mapper.map(users, UserDetailsDto);
  }

  @ApiGet('/:userId', { responseType: UserDetailsDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  @ApiParam({
    name: 'userId',
    type: String,
  })
  public async getUserById(
    @Param('userId') userId: string,
  ): Promise<UserDetailsDto> {
    const user: UserEntity = await this.userService.getUserById(userId);

    return this.mapper.map(user, UserDetailsDto);
  }
}
