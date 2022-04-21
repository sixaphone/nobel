import { Test } from '@nestjs/testing';
import { ClassMapper } from '@common/mapper/class.mapper';
import { UserFixture } from '@test/fixtures/user.fixture';
import { Seeder } from '@common/utils/seeder';
import { EntityManager } from 'typeorm';
import { TypeormTestModule } from '@common/utils/typeorm-test.module';
import { UserType } from '@user/user-type.enum';
import { AuthController } from '@auth/auth.controller';
import { UserEntity } from '@db/entities/user.entity';
import { JwtModule } from '@jwt/jwt.module';
import { BcryptPasswordService } from '@auth/bcrypt-password.service';
import { AuthService } from '@auth/auth.service';

describe('AuthController', () => {
  const seeder = new Seeder();
  let authController: AuthController;
  let manager: EntityManager;
  let managerUser: UserFixture;
  let adminUser: UserFixture;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeormTestModule.forTest([UserEntity]), JwtModule],
      providers: [BcryptPasswordService, AuthService, ClassMapper],
      controllers: [AuthController],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    manager = moduleRef.get<EntityManager>(EntityManager);
    managerUser = new UserFixture({ type: UserType.MANAGER });
    adminUser = new UserFixture({ type: UserType.ADMIN });

    await seeder.seed(manager, managerUser, adminUser);
  });

  afterAll(async () => {
    await seeder.clean(manager, managerUser, adminUser);
    await manager.connection.destroy();
  });

  test('login', async () => {
    const details = await authController.login({
      email: managerUser.raw.email,
      password: 'password',
    });

    expect(details.email).toEqual(managerUser.raw.email);
    expect(details.id).toEqual(managerUser.raw.id);
    expect(details.accessToken).toBeDefined();
  });

  test('login wrong email', async () => {
    try {
      await authController.login({
        email: 'some@mail.com',
        password: 'password',
      });
    } catch (e) {
      expect(e.message).toEqual('Invalid credentials');
    }
  });

  test('login wrong password', async () => {
    try {
      await authController.login({
        email: managerUser.raw.email,
        password: 'wrong',
      });
    } catch (e) {
      expect(e.message).toEqual('Invalid credentials');
    }
  });

  test('register', async () => {
    const details = await authController.register(managerUser.instance, {
      email: 'dev@test.com',
      password: 'password',
      type: UserType.WORKER,
      firstName: 'dev',
      lastName: 'eloper',
    });

    expect(details.email).toEqual('dev@test.com');
    expect(details.type).toEqual(UserType.WORKER);
    expect(details.accessToken).toBeTruthy();

    await manager.delete(UserEntity, { id: details.id });
  });

  test('register user under wrong role', async () => {
    try {
      await authController.register(managerUser.instance, {
        email: 'dev@test.com',
        password: 'password',
        type: UserType.ADMIN,
        firstName: 'dev',
        lastName: 'eloper',
      });
    } catch (e) {
      expect(e.message).toEqual('Cannot assign that role to user');
    }
  });
});
