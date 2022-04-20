import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClientType } from '@client/client-type.enum';

export class ClientCreateDto {
  @IsString()
  @ApiProperty()
  public readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly address?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  public readonly email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly list?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly phone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly comment?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly lat?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly lng?: string;

  @IsEnum(ClientType)
  @IsOptional()
  @ApiProperty()
  public readonly type?: ClientType;

  @IsUUID()
  @ApiProperty()
  public readonly serviceId: string;
}
