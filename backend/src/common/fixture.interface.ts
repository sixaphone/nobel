import { EntityManager } from 'typeorm';

export interface Fixture<T = any> {
  get raw(): Partial<T>;

  get instance(): Readonly<T>;

  init(manager: EntityManager): Promise<void>;

  clean(manager: EntityManager): Promise<void>;
}
