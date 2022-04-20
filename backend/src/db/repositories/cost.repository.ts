import { Repository } from 'typeorm';
import { PostgresBaseRepository } from '@db/repositories/postgres-base.repository';
import { CostEntity } from '@db/entities/cost.entity';

export type CostRepository = PostgresBaseRepository<CostEntity> &
  Repository<CostEntity>;

export const CostRepository: PostgresBaseRepository<CostEntity> = {
  ...PostgresBaseRepository,
};
