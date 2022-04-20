import { Body, HttpCode, Param } from '@nestjs/common';
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
import { ServicingTypeService } from '@servicing-type/servicing-type.service';
import { ServicingTypeDetailsDto } from '@servicing-type/dto/servicing-type.details.dto';
import { ServicingTypeCreateDto } from '@servicing-type/dto/servicing-type.create.dto';
import { ServicingTypeUpdateDto } from '@servicing-type/dto/servicing-type.update.dto';

@ApiController('servicing-types')
export class ServicingTypeController {
  constructor(
    private readonly servicingTypeService: ServicingTypeService,
    private readonly mapper: ClassMapper,
  ) {}

  @ApiGet('/', { responseType: [ServicingTypeDetailsDto] })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  public async list(
    @User() user: UserEntity,
  ): Promise<ServicingTypeDetailsDto[]> {
    const servicingTypes = await this.servicingTypeService.list({
      withDeleted: user.type === UserType.ADMIN,
    });

    return this.mapper.map(servicingTypes, ServicingTypeDetailsDto);
  }

  @ApiGet('/:servicingTypeId', { responseType: ServicingTypeDetailsDto })
  @ApiParam({ name: 'servicingTypeId', type: String })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  public async getById(
    @Param('servicingTypeId') servicingTypeId: string,
  ): Promise<ServicingTypeDetailsDto> {
    const servicingType = await this.servicingTypeService.getById(
      servicingTypeId,
    );

    return this.mapper.map(servicingType, ServicingTypeDetailsDto);
  }

  @ApiPost('/', { responseType: ServicingTypeDetailsDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  @HttpCode(201)
  public async create(
    @Body() payload: ServicingTypeCreateDto,
  ): Promise<ServicingTypeDetailsDto> {
    const servicingType = await this.servicingTypeService.createServicingType(
      payload,
    );

    return this.mapper.map(servicingType, ServicingTypeDetailsDto);
  }

  @ApiPut('/:servicingTypeId', { responseType: ServicingTypeDetailsDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  @ApiParam({ name: 'servicingTypeId', type: String })
  public async update(
    @Param('servicingTypeId') servicingTypeId: string,
    @Body() payload: ServicingTypeUpdateDto,
  ): Promise<ServicingTypeDetailsDto> {
    const servicingType = await this.servicingTypeService.updateServicingType(
      servicingTypeId,
      payload,
    );

    return this.mapper.map(servicingType, ServicingTypeDetailsDto);
  }

  @ApiDelete('/:servicingTypeId', { responseType: StatusDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  @ApiParam({ name: 'servicingTypeId', type: String })
  public async delete(
    @Param('servicingTypeId') servicingTypeId: string,
  ): Promise<StatusDto> {
    await this.servicingTypeService.deleteServicingType(servicingTypeId);

    return this.mapper.map(
      {
        code: 'ok',
        message: 'Servicing Type Deleted',
        title: 'Servicing Type Deleted',
      } as StatusDto,
      StatusDto,
    );
  }
}
