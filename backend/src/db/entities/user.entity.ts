import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserType } from '@user/user-type.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public firstName: string;

  @Column('varchar')
  public lastName: string;

  @Column('varchar')
  public email: string;

  @Column('varchar')
  public password: string;

  @Column('enum', { enum: UserType, default: UserType.WORKER })
  public type: UserType;

  @Column('varchar', { nullable: true })
  public address?: string;

  @Column('varchar', { nullable: true })
  public phone?: string;

  @Column('varchar', { nullable: true })
  public jmbg?: string;

  @Column('varchar', { nullable: true })
  public image?: string;

  @Column('date', { nullable: true })
  public hiredAt?: Date;

  @Column('date', { nullable: true })
  public deactivatedAt?: Date;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
