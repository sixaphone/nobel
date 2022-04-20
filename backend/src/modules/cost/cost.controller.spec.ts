import { CostController } from '@cost/cost.controller';
import { Test } from '@nestjs/testing';
import { CostService } from '@cost/cost.service';
import { ClassMapper } from '@common/mapper/class.mapper';
import { UserFixture } from '@test/fixtures/user.fixture';
import { Seeder } from '@common/utils/seeder';
import { EntityManager } from 'typeorm';
import { TypeormTestModule } from '@common/utils/typeorm-test.module';
import { CostFixture } from '@test/fixtures/cost.fixture';
import { UserType } from '@user/user-type.enum';
import { CostEntity } from '@db/entities/cost.entity';
import { v4 } from 'uuid';

describe('CostController', () => {
  const seeder = new Seeder();
  let costController: CostController;
  let manager: EntityManager;
  let managerUser: UserFixture;
  let adminUser: UserFixture;
  let cost: CostFixture;
  let deletedCost: CostFixture;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeormTestModule.forTest([CostEntity])],
      providers: [CostService, ClassMapper],
      controllers: [CostController],
    }).compile();

    costController = moduleRef.get<CostController>(CostController);
    manager = moduleRef.get<EntityManager>(EntityManager);
    managerUser = new UserFixture({ type: UserType.MANAGER });
    adminUser = new UserFixture({ type: UserType.ADMIN });
    cost = new CostFixture({});
    deletedCost = new CostFixture({ deleted: true });

    await seeder.seed(manager, managerUser, adminUser, cost, deletedCost);
  });

  afterAll(async () => {
    await seeder.clean(manager, managerUser, adminUser, cost, deletedCost);
    await manager.connection.destroy();
  });

  test('list as manager should filter deleted', async () => {
    const list = await costController.list(managerUser.instance);

    expect(list).toHaveLength(1);
    expect(list[0].name).toEqual(cost.raw.name);
    expect(list[0].id).toEqual(cost.raw.id);
  });

  test('list as admin should include deleted', async () => {
    const list = await costController.list(adminUser.instance);

    const item = list.find((x) => x.id === deletedCost.raw.id);
    expect(list).toHaveLength(2);
    expect(item).toBeDefined();
  });

  test('getById', async () => {
    const details = await costController.getById(cost.raw.id);

    expect(details.id).toEqual(cost.raw.id);
    expect(details.name).toEqual(cost.raw.name);
  });

  test('getById not found', async () => {
    try {
      await costController.getById(v4());
    } catch (e) {
      expect(e.message).toEqual('Not Found');
    }
  });

  test('create', async () => {
    const details = await costController.create({
      name: 'Test',
      unit: 'm',
      price: 200,
    });

    expect(details.name).toEqual('Test');
    expect(details.unit).toEqual('m');
    expect(details.price).toEqual(200);

    await manager.delete(CostEntity, { id: details.id });
  });

  test('update', async () => {
    const toUpdateCost = new CostFixture({});
    await seeder.seed(manager, toUpdateCost);
    const details = await costController.update(toUpdateCost.raw.id, {
      name: 'Test',
      unit: 'm',
      price: 200,
    });

    expect(details.id).toEqual(toUpdateCost.raw.id);
    expect(details.name).toEqual('Test');
    expect(details.unit).toEqual('m');
    expect(details.price).toEqual(200);

    await seeder.clean(manager, toUpdateCost);
  });

  test('update not found', async () => {
    try {
      await costController.update(v4(), {
        name: 'Test',
        unit: 'm',
        price: 200,
      });
    } catch (e) {
      expect(e.message).toEqual('Not Found');
    }
  });

  test('delete', async () => {
    const toDeleteCost = new CostFixture({});
    await seeder.seed(manager, toDeleteCost);
    const details = await costController.delete(toDeleteCost.raw.id);
    const softDeletedCost = await manager.findOne(CostEntity, {
      where: {
        id: toDeleteCost.raw.id,
      },
      withDeleted: true,
    });

    expect(softDeletedCost.deletedAt).toBeTruthy();
    expect(details.code).toEqual('ok');
    expect(details.message).toEqual('Cost Deleted');

    await seeder.clean(manager, toDeleteCost);
  });

  test('delete not found', async () => {
    try {
      await costController.delete(v4());
    } catch (e) {
      expect(e.message).toEqual('Not Found');
    }
  });
});
