import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicingTypeRepository } from '@db/repositories/servicing-type.repository';
import { ServicingTypeEntity } from '@db/entities/servicing-type.entity';
import { ServicingTypeCreateDto } from '@servicing-type/dto/servicing-type.create.dto';
import { ServicingTypeUpdateDto } from '@servicing-type/dto/servicing-type.update.dto';

@Injectable()
export class ServicingTypeService {
  private readonly servicingTypes: ServicingTypeRepository;

  constructor(
    @InjectRepository(ServicingTypeEntity)
    servicingTypes: Repository<ServicingTypeEntity>,
  ) {
    this.servicingTypes = servicingTypes.extend(ServicingTypeRepository);
  }

  public list(query?: {
    withDeleted?: boolean;
  }): Promise<ServicingTypeEntity[]> {
    return this.servicingTypes.find({
      withDeleted: !!query?.withDeleted,
    });
  }

  public getById(servicingTypeId: string): Promise<ServicingTypeEntity> {
    return this.servicingTypes.getById(servicingTypeId);
  }

  public async createServicingType(
    payload: ServicingTypeCreateDto,
  ): Promise<ServicingTypeEntity> {
    return this.servicingTypes.save(
      this.servicingTypes.create({
        name: payload.name,
        points: payload.points,
        triggersListUpdate: payload.triggersListUpdate,
      }),
    );
  }

  public async updateServicingType(
    servicingTypeId: string,
    payload: ServicingTypeUpdateDto,
  ): Promise<ServicingTypeEntity> {
    const servicingType = await this.servicingTypes.getById(servicingTypeId);

    if (payload.name) {
      servicingType.name = payload.name;
    }

    if (typeof payload.points !== 'undefined') {
      servicingType.points = payload.points;
    }

    if (typeof payload.triggersListUpdate !== 'undefined') {
      servicingType.triggersListUpdate = payload.triggersListUpdate;
    }

    return this.servicingTypes.save(servicingType);
  }

  public async deleteServicingType(servicingTypeId: string): Promise<void> {
    const servicingType = await this.servicingTypes.getById(servicingTypeId);

    await this.servicingTypes.softRemove(servicingType);
  }
}
