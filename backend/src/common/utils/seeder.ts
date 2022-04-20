import { EntityManager } from 'typeorm';
import { Fixture } from '@common/fixture.interface';

export class Seeder {
  public async seed(
    manager: EntityManager,
    ...fixtures: Fixture[]
  ): Promise<void> {
    await manager.transaction(async (manager: EntityManager) => {
      for (const fixture of fixtures) {
        await fixture.init(manager);
      }
    });
  }

  public async clean(
    manager: EntityManager,
    ...fixtures: Fixture[]
  ): Promise<void> {
    await manager.transaction(async (manager: EntityManager) => {
      for (const fixture of fixtures) {
        await fixture.clean(manager);
      }
    });
  }
}
