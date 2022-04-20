import { Repository } from 'typeorm';
import { PostgresBaseRepository } from '@db/repositories/postgres-base.repository';
import { ServicingTypeEntity } from '@db/entities/servicing-type.entity';

export type ServicingTypeRepository =
  PostgresBaseRepository<ServicingTypeEntity> & Repository<ServicingTypeEntity>;

export const ServicingTypeRepository: PostgresBaseRepository<ServicingTypeEntity> =
  {
    ...PostgresBaseRepository,
  };
