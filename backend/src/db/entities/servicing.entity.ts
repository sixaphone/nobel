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
import { ClientEntity } from './client.entity';
import { UserEntity } from './user.entity';
import { ServicingStatus } from '@servicing/servicing.status';

export type ServicingRelation = 'client' | 'service' | 'user';

@Entity('servicings')
export class ServicingEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public clientId: string;

  @Column('varchar')
  public serviceId: string;

  @Column('varchar')
  public userId: string;

  @Column('varchar', { nullable: true })
  public typeId?: string;

  @Column('varchar', { default: 'BAM' })
  public currency: string;

  @Column('float', { default: 0 })
  public handsCost: number;

  @Column('float', { default: 0 })
  public price: number;

  @Column('varchar', { nullable: true })
  public paymentMethod?: string;

  // comment manager leaves when making a pending servicing
  @Column('varchar', { nullable: true })
  public managerComment?: string;

  // comment worker leaves after completing a servicing
  @Column('varchar', { nullable: true })
  public workerComment?: string;

  @Column('varchar', { nullable: true })
  public serviceAtHours?: string;

  @Column('timestamp', { nullable: true })
  public servicedAt?: Date;

  @Column('boolean')
  public isMarked: boolean;

  @Column('enum', {
    enum: ServicingStatus,
    default: ServicingStatus.COMPLETED,
  })
  public status: ServicingStatus;

  @ManyToOne(() => ServiceEntity)
  @JoinColumn({ name: 'serviceId', referencedColumnName: 'id' })
  public service?: ServiceEntity;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'clientId', referencedColumnName: 'id' })
  public client?: ClientEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public user?: UserEntity;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
