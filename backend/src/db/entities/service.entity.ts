import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public name: string;

  @Column('varchar', { nullable: true })
  public code?: string;

  @Column('float', { default: 0 })
  public cost: number;

  @OneToMany(() => ClientEntity, (c) => c.service)
  public clients?: ClientEntity[];

  @DeleteDateColumn()
  public deletedAt?: Date;
}
