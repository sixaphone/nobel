import { EntityNotFoundError, Repository } from 'typeorm';

export abstract class PostgresBaseRepository<T> extends Repository<T> {
  public async getById(id: string): Promise<T> | never {
    try {
      return await this.createQueryBuilder('entities')
        .where('entities.id = :id')
        .setParameters({ id })
        .getOneOrFail();
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new Error('Not Found');
      }

      throw e;
    }
  }
}
