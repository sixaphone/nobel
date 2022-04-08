import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { PostgresBaseRepository } from '@db/repositories/postgres-base.repository';

export interface Users extends PostgresBaseRepository<UserEntity> {
  list(): Promise<UserEntity[]>;

  findByEmail(email: string): Promise<UserEntity>;
}

export type UserRepository = Users & Repository<UserEntity>;

export const UserRepository: Users = {
  ...PostgresBaseRepository,

  list(): Promise<UserEntity[]> {
    return this.find();
  },

  findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('users')
      .where('users.email = :email')
      .setParameters({ email })
      .getOne();
  },
};
