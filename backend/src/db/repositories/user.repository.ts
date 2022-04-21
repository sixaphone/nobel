import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { PostgresBaseRepository } from '@db/repositories/postgres-base.repository';
import { UserType } from '@user/user-type.enum';

export interface UserListWhereOptions {
  withDeleted?: boolean;
  types?: UserType[];
}

export interface Users extends PostgresBaseRepository<UserEntity> {
  list(where?: UserListWhereOptions): Promise<UserEntity[]>;

  findByEmail(email: string): Promise<UserEntity>;
}

export type UserRepository = Users & Repository<UserEntity>;

export const UserRepository: Users = {
  ...PostgresBaseRepository,

  list(where?: UserListWhereOptions): Promise<UserEntity[]> {
    const query = this.createQueryBuilder('users');

    if (where?.withDeleted) {
      query.withDeleted();
    }

    if (where?.types) {
      query.where('users.type in (:...types)', { types: where.types });
    }

    return query.getMany();
  },

  findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('users')
      .where('users.email = :email')
      .setParameters({ email })
      .getOne();
  },
};
