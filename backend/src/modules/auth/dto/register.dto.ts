import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '@user/user-type.enum';
import { Type } from 'class-transformer';

export class RegisterDto {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;

  @IsEnum(UserType)
  public readonly type: UserType;

  @IsString()
  @IsOptional()
  public address?: string;

  @IsString()
  @IsOptional()
  public phone?: string;

  @IsString()
  @IsOptional()
  public jmbg?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  public hiredAt?: Date;
}
