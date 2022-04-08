import { EntityNotFoundError } from 'typeorm';

export interface PostgresBaseRepository<T> {
  getById(id: string): Promise<T> | never;
}

export const PostgresBaseRepository: PostgresBaseRepository<any> = {
  async getById<T>(id: string): Promise<T> | never {
    try {
      return await this.createQueryBuilder('entities')
        .where('entities.id = :id')
        .withDeleted()
        .setParameters({ id })
        .getOneOrFail();
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new Error('Not Found');
      }

      throw e;
    }
  },
};
