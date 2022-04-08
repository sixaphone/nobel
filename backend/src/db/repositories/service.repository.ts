import { Repository } from 'typeorm';
import { ServiceEntity } from '@db/entities/service.entity';
import { PostgresBaseRepository } from '@db/repositories/postgres-base.repository';

export type ServiceRepository = PostgresBaseRepository<ServiceEntity> &
  Repository<ServiceEntity>;

export const ServiceRepository: PostgresBaseRepository<ServiceEntity> = {
  ...PostgresBaseRepository,
};
