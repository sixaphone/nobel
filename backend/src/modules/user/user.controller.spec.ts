import { Test } from '@nestjs/testing';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';
import { Seeder } from '@common/utils/seeder';
import { EntityManager } from 'typeorm';
import { UserFixture } from '@test/fixtures/user.fixture';
import { TypeormTestModule } from '@common/utils/typeorm-test.module';
import { ClassMapper } from '@common/mapper/class.mapper';
import { UserType } from '@user/user-type.enum';
import { UserEntity } from '@db/entities/user.entity';
import { JwtModule } from '@jwt/jwt.module';

describe('UserController', () => {
  const seeder = new Seeder();
  let userController: UserController;
  let manager: EntityManager;
  let managerUser: UserFixture;
  let adminUser: UserFixture;
  let worker: UserFixture;
  let deletedWorker: UserFixture;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeormTestModule.forTest([UserEntity]), JwtModule],
      controllers: [UserController],
      providers: [UserService, ClassMapper],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    manager = moduleRef.get<EntityManager>(EntityManager);
    adminUser = new UserFixture({ type: UserType.ADMIN });
    managerUser = new UserFixture({ type: UserType.MANAGER });
    worker = new UserFixture({ type: UserType.WORKER });
    deletedWorker = new UserFixture({ type: UserType.WORKER, deleted: true });

    await seeder.seed(manager, managerUser, adminUser, worker, deletedWorker);
  });

  afterAll(async () => {
    await seeder.clean(manager, managerUser, adminUser, worker, deletedWorker);
    await manager.connection.destroy();
  });

  test('listUsers as admin', async () => {
    const list = await userController.listUsers(adminUser.instance);
    const userTypes = list.map((item) => item.type);
    const deletedUser = list.find((item) => !!item.deletedAt);

    expect(list).toHaveLength(4);
    expect(userTypes).toContain(UserType.ADMIN);
    expect(userTypes).toContain(UserType.MANAGER);
    expect(userTypes).toContain(UserType.WORKER);
    expect(deletedUser).toBeTruthy();
  });

  test('listUsers as manager', async () => {
    const list = await userController.listUsers(managerUser.instance);
    const userTypes = list.map((item) => item.type);

    expect(list).toHaveLength(2);
    expect(userTypes).toContain(UserType.MANAGER);
    expect(userTypes).toContain(UserType.WORKER);
  });

  test('getUserById', async () => {
    const details = await userController.getUserById(worker.raw.id);

    expect(details.id).toContain(worker.raw.id);
    expect(details.email).toContain(worker.raw.email);
  });

  test('getUserById not found', async () => {
    try {
      await userController.getUserById(worker.raw.id);
    } catch (e) {
      expect(e.message).toEqual('Not Found');
    }
  });
});
