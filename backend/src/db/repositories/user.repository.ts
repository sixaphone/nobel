import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class UserRepository extends Repository<UserEntity> {
  public findByEmail(email: string): Promise<UserEntity> {
    return this.createQueryBuilder('users')
      .where('users.email = :email')
      .setParameters({ email })
      .getOne();
  }
}
