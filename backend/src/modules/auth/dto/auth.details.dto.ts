import { IsEmail, IsString } from 'class-validator';

export class AuthDetailsDto {
  @IsString()
  public readonly id: string;

  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;

  @IsEmail()
  public readonly email: string;

  @IsString()
  public accessToken: string;
}
