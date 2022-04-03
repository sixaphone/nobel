import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { ClassMapper } from '@common/mapper/class.mapper';
import { UserDetailsDto } from '@user/dto/user.details.dto';
import { UserEntity } from '@db/entities/user.entity';
import { ApiParam } from '@nestjs/swagger';

@Controller('/users')
export class UserController {
  constructor(
    private readonly mapper: ClassMapper,
    private readonly userService: UserService,
  ) {}

  @Get()
  public async listUsers(): Promise<UserDetailsDto[]> {
    const users: UserEntity[] = await this.userService.listUsers();

    return this.mapper.map(users, UserDetailsDto);
  }
  @Get('/:userId')
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
