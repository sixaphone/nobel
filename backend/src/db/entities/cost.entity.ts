import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('costs')
export class CostEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public name: string;

  @Column('varchar')
  public unit: string;

  @Column('float')
  public price: number;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
