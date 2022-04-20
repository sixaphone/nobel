import { Body, HttpCode, Param } from '@nestjs/common';
import { CostCreateDto } from '@cost/dto/cost.create.dto';
import { ApiController } from '@common/decorators/api.controller.decorator';
import { CostService } from '@cost/cost.service';
import { ApiGet } from '@common/decorators/api.get.decorator';
import { ClassMapper } from '@common/mapper/class.mapper';
import { Auth } from '@common/decorators/auth.decorator';
import { UserType } from '@user/user-type.enum';
import { User } from '@common/decorators/user.decorator';
import { UserEntity } from '@db/entities/user.entity';
import { ApiParam } from '@nestjs/swagger';
import { ApiPost } from '@common/decorators/api.post.decorator';
import { ApiPut } from '@common/decorators/api.put.decorator';
import { CostUpdateDto } from '@cost/dto/cost.update.dto';
import { ApiDelete } from '@common/decorators/api.delete.decorator';
import { StatusDto } from '@common/status.dto';
import { CostDetailsDto } from '@cost/dto/cost.details.dto';

@ApiController('costs')
export class CostController {
  constructor(
    private readonly costService: CostService,
    private readonly mapper: ClassMapper,
  ) {}

  @ApiGet('/', { responseType: [CostDetailsDto] })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  public async list(@User() user: UserEntity): Promise<CostDetailsDto[]> {
    const costs = await this.costService.list({
      withDeleted: user.type === UserType.ADMIN,
    });

    return this.mapper.map(costs, CostDetailsDto);
  }

  @ApiGet('/:costId', { responseType: CostDetailsDto })
  @ApiParam({ name: 'costId', type: String })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  public async getById(
    @Param('costId') costId: string,
  ): Promise<CostDetailsDto> {
    const service = await this.costService.getById(costId);

    return this.mapper.map(service, CostDetailsDto);
  }

  @ApiPost('/', { responseType: CostDetailsDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  @HttpCode(201)
  public async create(@Body() payload: CostCreateDto): Promise<CostDetailsDto> {
    const service = await this.costService.createCost(payload);

    return this.mapper.map(service, CostDetailsDto);
  }

  @ApiPut('/:costId', { responseType: CostDetailsDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  @ApiParam({ name: 'costId', type: String })
  public async update(
    @Param('costId') costId: string,
    @Body() payload: CostUpdateDto,
  ): Promise<CostDetailsDto> {
    const service = await this.costService.updateCost(costId, payload);

    return this.mapper.map(service, CostDetailsDto);
  }

  @ApiDelete('/:costId', { responseType: StatusDto })
  @Auth([UserType.ADMIN, UserType.MANAGER])
  @HttpCode(204)
  @ApiParam({ name: 'costId', type: String })
  public async delete(@Param('costId') costId: string): Promise<StatusDto> {
    await this.costService.deleteCost(costId);

    return this.mapper.map(
      {
        code: 'ok',
        message: 'Cost Deleted',
        title: 'Cost Deleted',
      } as StatusDto,
      StatusDto,
    );
  }
}
