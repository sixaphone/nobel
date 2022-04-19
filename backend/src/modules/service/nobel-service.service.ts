import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from '@db/entities/service.entity';
import { ServiceRepository } from '@db/repositories/service.repository';
import { ServiceCreateDto } from '@service/dto/service.create.dto';
import { ServiceUpdateDto } from '@service/dto/service.update.dto';

@Injectable()
export class NobelServiceService {
  private readonly services: ServiceRepository;

  constructor(
    @InjectRepository(ServiceEntity)
    services: Repository<ServiceEntity>,
  ) {
    this.services = services.extend(ServiceRepository);
  }

  public list(query?: { withDeleted?: boolean }): Promise<ServiceEntity[]> {
    return this.services.find({
      withDeleted: !!query?.withDeleted,
    });
  }

  public getById(serviceId: string): Promise<ServiceEntity> {
    return this.services.getById(serviceId);
  }

  public async createService(
    payload: ServiceCreateDto,
  ): Promise<ServiceEntity> {
    return this.services.save(
      this.services.create({
        name: payload.name,
        code: payload.code,
        cost: payload.cost,
      }),
    );
  }

  public async updateService(
    serviceId: string,
    payload: ServiceUpdateDto,
  ): Promise<ServiceEntity> {
    const service = await this.services.getById(serviceId);

    if (payload.name) {
      service.name = payload.name;
    }

    if (payload.code) {
      service.code = payload.code;
    }

    if (typeof payload.cost !== 'undefined') {
      service.cost = payload.cost;
    }

    return this.services.save(service);
  }

  public async deleteService(serviceId: string): Promise<void> {
    const service = await this.services.getById(serviceId);

    await this.services.softRemove(service);
  }
}
