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

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public name: string;

  @Column('varchar')
  public address: string;

  @Column('varchar')
  public email: string;

  @Column('varchar')
  public list: string;

  @Column('varchar')
  public phone: string;

  @Column('varchar')
  public comment: string;

  @Column('varchar')
  public image: string;

  @Column('varchar')
  public lat: string;

  @Column('varchar')
  public lng: string;

  @Column('enum', { enum: ClientType, default: ClientType.PRIVATE })
  public type: ClientType;

  @Column('boolean')
  public isProblematic: boolean;

  @Column('boolean')
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
