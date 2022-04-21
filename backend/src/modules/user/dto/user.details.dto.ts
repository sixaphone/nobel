import { UserType } from '@user/user-type.enum';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDetailsDto {
  @IsUUID()
  @ApiProperty()
  @Expose()
  public readonly id: string;

  @IsString()
  @ApiProperty()
  @Expose()
  public readonly firstName: string;

  @IsString()
  @ApiProperty()
  @Expose()
  public readonly lastName: string;

  @IsString()
  @ApiProperty()
  @Expose()
  public readonly email: string;

  @IsEnum(UserType)
  @ApiProperty()
  @Expose()
  public type: UserType;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public address?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public phone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public jmbg?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public image?: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  @Expose()
  public readonly hiredAt: Date;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  @Expose()
  public readonly deletedAt: Date;
}
