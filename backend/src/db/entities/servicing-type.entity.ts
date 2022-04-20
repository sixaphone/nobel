import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('servicing_types')
export class ServicingTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public name: string;

  @Column('integer')
  public points: number;

  @Column('boolean', { default: false })
  public triggersListUpdate: boolean;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
