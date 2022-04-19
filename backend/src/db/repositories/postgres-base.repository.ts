import { EntityNotFoundError, SelectQueryBuilder } from 'typeorm';

export interface PostgresBaseRepository<T> {
  getById(
    id: string,
    options?: {
      alias?: string;
      relationQb?: (query: SelectQueryBuilder<T>) => void;
    },
  ): Promise<T> | never;
}

export const PostgresBaseRepository: PostgresBaseRepository<any> = {
  async getById<T>(
    id: string,
    options?: {
      alias?: string;
      relationQb?: (query: SelectQueryBuilder<T>) => void;
    },
  ): Promise<T> | never {
    try {
      const alias = options?.alias ?? 'entities';
      const query = this.createQueryBuilder(alias)
        .where(`${alias}.id = :id`)
        .withDeleted()
        .setParameters({ id });

      if (options?.relationQb) {
        options.relationQb(query);
      }

      return await query.getOneOrFail();
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new Error('Not Found');
      }

      throw e;
    }
  },
};
