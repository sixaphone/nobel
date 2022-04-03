import { Injectable } from '@nestjs/common';
import { UserEntity } from '@db/entities/user.entity';
import { UserRepository } from '@db/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly users: UserRepository;

  constructor(
    @InjectRepository(UserEntity)
    users: Repository<UserEntity>,
  ) {
    this.users = users.extend(UserRepository);
  }

  public listUsers(): Promise<UserEntity[]> {
    return this.users.list();
  }

  public getUserById(userId: string): Promise<UserEntity> | never {
    return this.users.getById(userId);
  }
}
