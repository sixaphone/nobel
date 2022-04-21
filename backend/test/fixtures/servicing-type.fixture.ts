import { Fixture } from '@common/fixture.interface';
import { EntityManager } from 'typeorm';
import { v4 } from 'uuid';
import { ServicingTypeEntity } from '@db/entities/servicing-type.entity';

export class ServicingTypeFixture implements Fixture<ServicingTypeEntity> {
  private _servicingType: ServicingTypeEntity;
  private readonly _servicingTypeId: string;
  private readonly _deleted: boolean;

  get instance(): Readonly<ServicingTypeEntity> {
    return this._servicingType;
  }

  get raw(): Partial<ServicingTypeEntity> {
    return {
      id: this._servicingTypeId,
      name: this._servicingTypeId,
      points: 2,
      triggersListUpdate: true,
      deletedAt: this._deleted ? new Date() : null,
    };
  }

  constructor(data: { servicingTypeId?: string; deleted?: boolean }) {
    this._servicingTypeId = data.servicingTypeId ?? v4();
    this._deleted = !!data.deleted;
  }

  public async init(manager: EntityManager): Promise<void> {
    const servicingTypes = manager.getRepository(ServicingTypeEntity);

    if (!this._servicingType) {
      this._servicingType = await servicingTypes.save(
        servicingTypes.create(this.raw),
      );
    }
  }

  public async clean(manager: EntityManager): Promise<void> {
    const servicingTypes = manager.getRepository(ServicingTypeEntity);

    if (this._servicingType) {
      await servicingTypes.delete({ id: this._servicingTypeId });
      this._servicingType = undefined;
    }
  }
}
