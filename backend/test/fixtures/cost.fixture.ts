import { Fixture } from '@common/fixture.interface';
import { EntityManager } from 'typeorm';
import { v4 } from 'uuid';
import { CostEntity } from '@db/entities/cost.entity';

export class CostFixture implements Fixture<CostEntity> {
  private _cost: CostEntity;
  private readonly _costId: string;
  private readonly _deleted: boolean;

  get instance(): Readonly<CostEntity> {
    return this._cost;
  }

  get raw(): Partial<CostEntity> {
    return {
      id: this._costId,
      name: this._costId,
      price: 100,
      unit: 'kg/l',
      deletedAt: this._deleted ? new Date() : null,
    };
  }

  constructor(data: { costId?: string; deleted?: boolean }) {
    this._costId = data.costId ?? v4();
    this._deleted = !!data.deleted;
  }

  public async init(manager: EntityManager): Promise<void> {
    const costs = manager.getRepository(CostEntity);

    if (!this._cost) {
      this._cost = await costs.save(costs.create(this.raw));
    }
  }

  public async clean(manager: EntityManager): Promise<void> {
    const costs = manager.getRepository(CostEntity);

    if (this._cost) {
      await costs.delete({ id: this._costId });
      this._cost = undefined;
    }
  }
}
