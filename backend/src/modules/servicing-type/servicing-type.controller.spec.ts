import { ServicingTypeController } from '@servicing-type/servicing-type.controller';
import { Test } from '@nestjs/testing';
import { ClassMapper } from '@common/mapper/class.mapper';
import { UserFixture } from '@test/fixtures/user.fixture';
import { Seeder } from '@common/utils/seeder';
import { EntityManager } from 'typeorm';
import { TypeormTestModule } from '@common/utils/typeorm-test.module';
import { UserType } from '@user/user-type.enum';
import { v4 } from 'uuid';
import { ServicingTypeService } from '@servicing-type/servicing-type.service';
import { ServicingTypeEntity } from '@db/entities/servicing-type.entity';
import { ServicingTypeFixture } from '@test/fixtures/servicing-type.fixture';
import { ServicingEntity } from '@db/entities/servicing.entity';

describe('ServicingTypeController', () => {
  const seeder = new Seeder();
  let servicingTypeController: ServicingTypeController;
  let manager: EntityManager;
  let managerUser: UserFixture;
  let adminUser: UserFixture;
  let servicingType: ServicingTypeFixture;
  let deletedServicingType: ServicingTypeFixture;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeormTestModule.forTest([ServicingTypeEntity])],
      providers: [ServicingTypeService, ClassMapper],
      controllers: [ServicingTypeController],
    }).compile();

    servicingTypeController = moduleRef.get<ServicingTypeController>(
      ServicingTypeController,
    );
    manager = moduleRef.get<EntityManager>(EntityManager);
    managerUser = new UserFixture({ type: UserType.MANAGER });
    adminUser = new UserFixture({ type: UserType.ADMIN });
    servicingType = new ServicingTypeFixture({});
    deletedServicingType = new ServicingTypeFixture({ deleted: true });

    await seeder.seed(
      manager,
      managerUser,
      adminUser,
      servicingType,
      deletedServicingType,
    );
  });

  afterAll(async () => {
    await seeder.clean(
      manager,
      managerUser,
      adminUser,
      servicingType,
      deletedServicingType,
    );
    await manager.connection.destroy();
  });

  test('list as manager should filter deleted', async () => {
    const list = await servicingTypeController.list(managerUser.instance);

    expect(list).toHaveLength(1);
    expect(list[0].name).toEqual(servicingType.raw.name);
    expect(list[0].id).toEqual(servicingType.raw.id);
  });

  test('list as admin should include deleted', async () => {
    const list = await servicingTypeController.list(adminUser.instance);

    const item = list.find((x) => x.id === deletedServicingType.raw.id);
    expect(list).toHaveLength(2);
    expect(item).toBeDefined();
  });

  test('getById', async () => {
    const details = await servicingTypeController.getById(servicingType.raw.id);

    expect(details.id).toEqual(servicingType.raw.id);
    expect(details.name).toEqual(servicingType.raw.name);
  });

  test('getById not found', async () => {
    try {
      await servicingTypeController.getById(v4());
    } catch (e) {
      expect(e.message).toEqual('Not Found');
    }
  });

  test('create', async () => {
    const details = await servicingTypeController.create({
      name: 'Test',
      points: 2,
      triggersListUpdate: false,
    });

    expect(details.name).toEqual('Test');
    expect(details.points).toEqual(2);
    expect(details.triggersListUpdate).toBeFalsy();

    await manager.delete(ServicingTypeEntity, { id: details.id });
  });

  test('update', async () => {
    const toUpdateType = new ServicingTypeFixture({});
    await seeder.seed(manager, toUpdateType);
    const details = await servicingTypeController.update(toUpdateType.raw.id, {
      name: 'Test',
      points: 100,
      triggersListUpdate: true,
    });

    expect(details.id).toEqual(toUpdateType.raw.id);
    expect(details.name).toEqual('Test');
    expect(details.points).toEqual(100);
    expect(details.triggersListUpdate).toBeTruthy();

    await seeder.clean(manager, toUpdateType);
  });

  test('update not found', async () => {
    try {
      await servicingTypeController.update(v4(), {
        name: 'Test',
        points: 1,
      });
    } catch (e) {
      expect(e.message).toEqual('Not Found');
    }
  });

  test('delete', async () => {
    const toDeleteType = new ServicingTypeFixture({});
    await seeder.seed(manager, toDeleteType);
    const details = await servicingTypeController.delete(toDeleteType.raw.id);
    const softDeletedType: ServicingTypeEntity = await manager.findOne(
      ServicingTypeEntity,
      {
        where: {
          id: toDeleteType.raw.id,
        },
        withDeleted: true,
      },
    );

    expect(softDeletedType.deletedAt).toBeTruthy();
    expect(details.code).toEqual('ok');
    expect(details.message).toEqual('Servicing Type Deleted');

    await seeder.clean(manager, toDeleteType);
  });

  test('delete not found', async () => {
    try {
      await servicingTypeController.delete(v4());
    } catch (e) {
      expect(e.message).toEqual('Not Found');
    }
  });
});
