import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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

  @IsString()
  @ApiProperty()
  @Expose()
  public accessToken: string;
}
