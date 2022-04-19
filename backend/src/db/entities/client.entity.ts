import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ServiceEntity } from './service.entity';
import { ClientType } from '@client/client-type.enum';

export type ClientRelation = 'service';

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public name: string;

  @Column('varchar', { nullable: true })
  public address?: string;

  @Column('varchar', { nullable: true })
  public email?: string;

  @Column('varchar')
  public list: string;

  @Column('varchar', { nullable: true })
  public phone?: string;

  @Column('varchar', { nullable: true })
  public comment?: string;

  @Column('varchar')
  public image: string;

  @Column('varchar', { nullable: true })
  public lat?: string;

  @Column('varchar', { nullable: true })
  public lng?: string;

  @Column('enum', { enum: ClientType, default: ClientType.PRIVATE })
  public type: ClientType;

  @Column('boolean', { default: false })
  public isProblematic: boolean;

  @Column('boolean', { default: false })
  public isMarked: boolean;

  @Column('varchar')
  public serviceId: string;

  @ManyToOne(() => ServiceEntity, (s) => s.clients, { cascade: true })
  @JoinColumn({ name: 'serviceId', referencedColumnName: 'id' })
  public service?: ServiceEntity;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
