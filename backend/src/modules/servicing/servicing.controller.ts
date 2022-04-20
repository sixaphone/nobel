import {
  Body,
  ForbiddenException,
  HttpCode,
  Param,
  Query,
} from '@nestjs/common';
import { ApiController } from '@common/decorators/api.controller.decorator';
import { ApiGet } from '@common/decorators/api.get.decorator';
import { ClassMapper } from '@common/mapper/class.mapper';
import { Auth } from '@common/decorators/auth.decorator';
import { UserType } from '@user/user-type.enum';
import { User } from '@common/decorators/user.decorator';
import { UserEntity } from '@db/entities/user.entity';
import { ApiParam } from '@nestjs/swagger';
import { ApiPost } from '@common/decorators/api.post.decorator';
import { ApiPut } from '@common/decorators/api.put.decorator';
import { ApiDelete } from '@common/decorators/api.delete.decorator';
import { StatusDto } from '@common/status.dto';
import { ServicingDetailsDto } from '@servicing/dto/servicing.details.dto';
import { NobelServicingService } from '@servicing/nobel-servicing.service';
import { ServicingUpdateDto } from '@servicing/dto/servicing.update.dto';
import { ServicingCreateDto } from '@servicing/dto/servicing.create.dto';
import { ServicingStatus } from '@servicing/servicing.status';
import { ServicingQueryDto } from '@servicing/dto/servicing.query.dto';

@ApiController('servicings')
export class ServicingController {
  constructor(
    private readonly nobelServicingService: NobelServicingService,
    private readonly mapper: ClassMapper,
  ) {}

  @ApiGet('/', { responseType: [ServicingDetailsDto] })
  @Auth([UserType.ADMIN, UserType.MANAGER, UserType.WORKER])
  public async list(
    @User() user: UserEntity,
    @Query() query: ServicingQueryDto,
  ): Promise<ServicingDetailsDto[]> {
    const servicings = await this.nobelServicingService.list(
      {
        ...query,
        userId: user.type === UserType.WORKER ? user.id : query.userId,
        withDeleted: user.type === UserType.ADMIN,
      },
      { relations: query.withRelations ? ['service', 'client', 'user'] : [] },
    );

    return this.mapper.map(servicings, ServicingDetailsDto);
  }

  @ApiGet('/:servicingId', { responseType: ServicingDetailsDto })
  @ApiParam({ name: 'servicingId', type: String })
  @Auth([UserType.ADMIN, UserType.MANAGER, UserType.WORKER])
  public async getById(
    @User() user: UserEntity,
    @Param('servicingId') servicingId: string,
  ): Promise<ServicingDetailsDto> {
    const service = await this.nobelServicingService.getById(servicingId, {
      relations: ['service'],
    });

    if (service.userId !== user.id) {
      throw new ForbiddenException('User cannot view servicing');
    }

    return this.mapper.map(service, ServicingDetailsDto);
  }

  @ApiPost('/', { responseType: ServicingDetailsDto })
  @Auth([UserType.ADMIN, UserType.MANAGER, UserType.WORKER])
  @HttpCode(201)
  public async create(
    @User() user: UserEntity,
    @Body() payload: ServicingCreateDto,
  ): Promise<ServicingDetailsDto> {
    const service = await this.nobelServicingService.createServicing({
      ...payload,
      status:
        user.type === UserType.WORKER
          ? ServicingStatus.COMPLETED
          : payload.status,
    });

    return this.mapper.map(service, ServicingDetailsDto);
  }

  @ApiPut('/:servicingId', { responseType: ServicingDetailsDto })
  @Auth([UserType.ADMIN, UserType.MANAGER, UserType.WORKER])
  @ApiParam({ name: 'servicingId', type: String })
  public async update(
    @User() user: UserEntity,
    @Param('servicingId') servicingId: string,
    @Body() payload: ServicingUpdateDto,
  ): Promise<ServicingDetailsDto> {
    const service = await this.nobelServicingService.updateServicing(
      servicingId,
      {
        ...payload,
        status:
          user.type === UserType.WORKER
            ? ServicingStatus.COMPLETED
            : payload.status,
      },
    );

    return this.mapper.map(service, ServicingDetailsDto);
  }

  @ApiDelete('/:servicingId', { responseType: StatusDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  @ApiParam({ name: 'servicingId', type: String })
  public async delete(
    @Param('servicingId') servicingId: string,
  ): Promise<StatusDto> {
    await this.nobelServicingService.deleteServicing(servicingId);

    return this.mapper.map(
      {
        code: 'ok',
        message: 'Servicing Deleted',
        title: 'Servicing Deleted',
      } as StatusDto,
      StatusDto,
    );
  }
}
