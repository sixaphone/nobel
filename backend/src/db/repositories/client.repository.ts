import { Repository } from 'typeorm';
import { PostgresBaseRepository } from '@db/repositories/postgres-base.repository';
import { ClientEntity, ClientRelation } from '@db/entities/client.entity';

export interface ClientListWhereOptions {
  withDeleted?: boolean;
  markedOnly?: boolean;
  list?: string;
}

export interface Clients extends PostgresBaseRepository<ClientEntity> {
  filter(
    where?: ClientListWhereOptions,
    options?: { relations?: ClientRelation[] },
  ): Promise<ClientEntity[]>;
}

export type ClientRepository = Clients & Repository<ClientEntity>;

export const ClientRepository: Clients = {
  ...PostgresBaseRepository,

  filter(
    where?: ClientListWhereOptions,
    options?: { relations?: ClientRelation[] },
  ): Promise<ClientEntity[]> {
    const query = this.createQueryBuilder('clients');

    if (where?.withDeleted) {
      query.withDeleted();
    }

    if (where?.markedOnly) {
      query.where('clients.isMarked = true');
    }

    if (where?.list) {
      query.list('clients.list = :list', { list: where.list });
    }

    if (options?.relations) {
      const relations = new Set(options.relations);

      if (relations.has('service')) {
        query.innerJoinAndSelect('clients.service', 'service');
      }
    }

    return query.getMany();
  },
};
