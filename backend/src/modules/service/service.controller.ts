import { Body, HttpCode, Param } from '@nestjs/common';
import { ServiceCreateDto } from '@service/dto/service.create.dto';
import { ApiController } from '@common/decorators/api.controller.decorator';
import { NobelServiceService } from '@service/nobel-service.service';
import { ApiGet } from '@common/decorators/api.get.decorator';
import { ServiceDetailsDto } from '@service/dto/service.details.dto';
import { ClassMapper } from '@common/mapper/class.mapper';
import { Auth } from '@common/decorators/auth.decorator';
import { UserType } from '@user/user-type.enum';
import { User } from '@common/decorators/user.decorator';
import { UserEntity } from '@db/entities/user.entity';
import { ApiParam } from '@nestjs/swagger';
import { ApiPost } from '@common/decorators/api.post.decorator';
import { ApiPut } from '@common/decorators/api.put.decorator';
import { ServiceUpdateDto } from '@service/dto/service.update.dto';
import { ApiDelete } from '@common/decorators/api.delete.decorator';
import { StatusDto } from '@common/status.dto';

@ApiController('services')
export class ServiceController {
  constructor(
    private readonly nobelService: NobelServiceService,
    private readonly mapper: ClassMapper,
  ) {}

  @ApiGet('/', { responseType: [ServiceDetailsDto] })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  public async list(@User() user: UserEntity): Promise<ServiceDetailsDto[]> {
    const services = await this.nobelService.list({
      withDeleted: user.type === UserType.ADMIN,
    });

    return this.mapper.map(services, ServiceDetailsDto);
  }

  @ApiGet('/:serviceId', { responseType: ServiceDetailsDto })
  @ApiParam({ name: 'serviceId', type: String })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  public async getById(
    @Param('serviceId') serviceId: string,
  ): Promise<ServiceDetailsDto> {
    const service = await this.nobelService.getById(serviceId);

    return this.mapper.map(service, ServiceDetailsDto);
  }

  @ApiPost('/', { responseType: ServiceDetailsDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  @HttpCode(201)
  public async create(
    @Body() payload: ServiceCreateDto,
  ): Promise<ServiceDetailsDto> {
    const service = await this.nobelService.createService(payload);

    return this.mapper.map(service, ServiceDetailsDto);
  }

  @ApiPut('/:serviceId', { responseType: ServiceDetailsDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  @ApiParam({ name: 'serviceId', type: String })
  public async update(
    @Param('serviceId') serviceId: string,
    @Body() payload: ServiceUpdateDto,
  ): Promise<ServiceDetailsDto> {
    const service = await this.nobelService.updateService(serviceId, payload);

    return this.mapper.map(service, ServiceDetailsDto);
  }

  @ApiDelete('/:serviceId', { responseType: StatusDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  @ApiParam({ name: 'serviceId', type: String })
  public async delete(
    @Param('serviceId') serviceId: string,
  ): Promise<StatusDto> {
    await this.nobelService.deleteService(serviceId);

    return this.mapper.map(
      {
        code: 'ok',
        message: 'Service Deleted',
        title: 'Service Deleted',
      } as StatusDto,
      StatusDto,
    );
  }
}
