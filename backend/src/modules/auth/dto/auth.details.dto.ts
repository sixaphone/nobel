import { IsEmail, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserType } from '@user/user-type.enum';

export class AuthDetailsDto {
  @IsString()
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

  @IsEmail()
  @ApiProperty()
  @Expose()
  public readonly email: string;

  @IsEnum(UserType)
  @ApiProperty()
  @Expose()
  public readonly type: string;

  @IsString()
  @ApiProperty()
  @Expose()
  public accessToken: string;
}
