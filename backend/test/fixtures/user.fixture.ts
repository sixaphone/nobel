import { Fixture } from '@common/fixture.interface';
import { UserEntity } from '@db/entities/user.entity';
import { EntityManager } from 'typeorm';
import { UserType } from '@user/user-type.enum';
import { v4 } from 'uuid';

export class UserFixture implements Fixture<UserEntity> {
  private _user: UserEntity;
  private readonly _type: UserType;
  private readonly _userId: string;

  get instance(): Readonly<UserEntity> {
    return this._user;
  }

  get raw(): Partial<UserEntity> {
    return {
      id: this._userId,
      firstName: 'John',
      lastName: 'Doe',
      email: `${this._userId}@email.com`,
      type: this._type,
      password: v4(),
    };
  }

  constructor(data: { userId?: string; type?: UserType }) {
    this._userId = data.userId ?? v4();
    this._type = data.type ?? UserType.WORKER;
  }

  public async init(manager: EntityManager): Promise<void> {
    const users = manager.getRepository(UserEntity);

    if (!this._user) {
      this._user = await users.save(users.create(this.raw));
    }
  }

  public async clean(manager: EntityManager): Promise<void> {
    const users = manager.getRepository(UserEntity);

    if (this._user) {
      await users.delete({ id: this._userId });
      this._user = undefined;
    }
  }
}
