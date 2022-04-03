import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @ApiProperty()
  public readonly password: string;
}
