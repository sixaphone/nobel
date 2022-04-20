import { Repository } from 'typeorm';
import { PostgresBaseRepository } from '@db/repositories/postgres-base.repository';
import {
  ServicingEntity,
  ServicingRelation,
} from '@db/entities/servicing.entity';
import { ServicingStatus } from '@servicing/servicing.status';

export interface ServicingListWhereOptions {
  withDeleted?: boolean;
  markedOnly?: boolean;
  status?: ServicingStatus;
  userId?: string;
  clientId?: string;
  serviceId?: string;
  servicedFrom?: Date;
  servicedTo?: Date;
}

export interface Servicings extends PostgresBaseRepository<ServicingEntity> {
  filter(
    where?: ServicingListWhereOptions,
    options?: { relations?: ServicingRelation[] },
  ): Promise<ServicingEntity[]>;
}

export type ServicingRepository = Servicings & Repository<ServicingEntity>;

export const ServicingRepository: Servicings = {
  ...PostgresBaseRepository,

  filter(
    where?: ServicingListWhereOptions,
    options?: { relations?: ServicingRelation[] },
  ): Promise<ServicingEntity[]> {
    const query = this.createQueryBuilder('servicings');

    if (where?.withDeleted) {
      query.withDeleted();
    }

    if (where?.markedOnly) {
      query.where('servicings.isMarked = true');
    }

    if (where?.userId) {
      query.where('servicings.userId = :userId', { userId: where.userId });
    }

    if (where?.clientId) {
      query.where('servicings.clientId = :clientId', {
        clientId: where.clientId,
      });
    }

    if (where?.serviceId) {
      query.where('servicings.serviceId = :serviceId', {
        serviceId: where.serviceId,
      });
    }

    if (where?.status) {
      query.where('servicings.status = :status', {
        status: where.status,
      });
    }

    if (where?.servicedFrom) {
      query.where('servicings.servicedAt >= :servicedFrom', {
        servicedFrom: where.servicedFrom,
      });
    }

    if (where?.servicedTo) {
      query.where('servicings.servicedAt <= :servicedTo', {
        servicedTo: where.servicedTo,
      });
    }

    if (options?.relations) {
      const relations = new Set(options.relations);

      if (relations.has('service')) {
        query.innerJoinAndSelect('servicings.service', 'service');
      }

      if (relations.has('client')) {
        query.innerJoinAndSelect('servicings.client', 'client');
      }

      if (relations.has('user')) {
        query.innerJoinAndSelect('servicings.user', 'user');
      }
    }

    return query.getMany();
  },
};
