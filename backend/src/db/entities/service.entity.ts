import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JoinColumn } from 'typeorm/browser';
import { ClientEntity } from '@db/entities/client.entity';

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public name: string;

  @Column('varchar', { nullable: true })
  public code?: string;

  @Column('double', { default: 0 })
  public cost: number;

  @OneToMany(() => ClientEntity, (c) => c.service)
  public clients?: ClientEntity[];

  @DeleteDateColumn()
  public deletedAt?: Date;
}
