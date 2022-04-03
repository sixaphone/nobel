import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '@user/user-type.enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @ApiProperty()
  public readonly password: string;

  @IsString()
  @ApiProperty()
  public readonly firstName: string;

  @IsString()
  @ApiProperty()
  public readonly lastName: string;

  @IsEnum(UserType)
  @ApiProperty()
  public readonly type: UserType;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public address?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public phone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public jmbg?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty()
  public hiredAt?: Date;
}
