import { EntityNotFoundError, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export interface Users {
  list(): Promise<UserEntity[]>;

  getById(id: string): Promise<UserEntity> | never;

  findByEmail(email: string): Promise<UserEntity>;
}

export type UserRepository = Users & Repository<UserEntity>;

export const UserRepository: Users = {
  list(): Promise<UserEntity[]> {
    return this.find();
  },

  async getById(id: string): Promise<UserEntity> | never {
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
  },

  findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('users')
      .where('users.email = :email')
      .setParameters({ email })
      .getOne();
  },
};
