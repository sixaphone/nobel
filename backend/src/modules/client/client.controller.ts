import { Body, HttpCode, Param, Query } from '@nestjs/common';
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
import { ClientService } from '@client/client.service';
import { ClientDetailsDto } from '@client/dto/client.details.dto';
import { ClientQueryDto } from '@client/dto/client.query.dto';
import { ClientCreateDto } from '@client/dto/client.create.dto';
import { ClientUpdateDto } from '@client/dto/client.update.dto';

@ApiController('clients')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly mapper: ClassMapper,
  ) {}

  @ApiGet('/', { responseType: [ClientDetailsDto] })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  public async list(
    @User() user: UserEntity,
    @Query() query: ClientQueryDto,
  ): Promise<ClientDetailsDto[]> {
    const clients = await this.clientService.list(
      {
        ...query,
        withDeleted: user.type === UserType.ADMIN,
      },
      { relations: ['service'] },
    );

    return this.mapper.map(clients, ClientDetailsDto);
  }

  @ApiGet('/:clientId', { responseType: ClientDetailsDto })
  @ApiParam({ name: 'clientId', type: String })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  public async getById(
    @Param('clientId') clientId: string,
  ): Promise<ClientDetailsDto> {
    const service = await this.clientService.getById(clientId, {
      relations: ['service'],
    });

    return this.mapper.map(service, ClientDetailsDto);
  }

  @ApiPost('/', { responseType: ClientDetailsDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  @HttpCode(201)
  public async create(
    @Body() payload: ClientCreateDto,
  ): Promise<ClientDetailsDto> {
    const service = await this.clientService.createClient(payload);

    return this.mapper.map(service, ClientDetailsDto);
  }

  @ApiPut('/:clientId', { responseType: ClientDetailsDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  @ApiParam({ name: 'clientId', type: String })
  public async update(
    @Param('clientId') clientId: string,
    @Body() payload: ClientUpdateDto,
  ): Promise<ClientDetailsDto> {
    const service = await this.clientService.updateClient(clientId, payload);

    return this.mapper.map(service, ClientDetailsDto);
  }

  @ApiDelete('/:clientId', { responseType: StatusDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  @ApiParam({ name: 'clientId', type: String })
  public async delete(@Param('clientId') clientId: string): Promise<StatusDto> {
    await this.clientService.deleteClient(clientId);

    return this.mapper.map(
      {
        code: 'ok',
        message: 'Client Deleted',
        title: 'Client Deleted',
      } as StatusDto,
      StatusDto,
    );
  }
}
