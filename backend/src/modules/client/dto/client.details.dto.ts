import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ClientType } from '@client/client-type.enum';
import { ServiceDetailsDto } from '@service/dto/service.details.dto';

export class ClientDetailsDto {
  @IsUUID()
  @ApiProperty()
  @Expose()
  public readonly id: string;

  @IsString()
  @ApiProperty()
  @Expose()
  public readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly address?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly email?: string;

  @IsString()
  @ApiProperty()
  @Expose()
  public readonly list: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly phone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly comment?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly image: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly lat?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly lng?: string;

  @IsEnum(ClientType)
  @ApiProperty()
  @Expose()
  public readonly type: ClientType;

  @IsBoolean()
  @ApiProperty()
  @Expose()
  public readonly isProblematic: boolean;

  @IsBoolean()
  @ApiProperty()
  @Expose()
  public readonly isMarked: boolean;

  @IsUUID()
  @ApiProperty()
  @Expose()
  public readonly serviceId: string;

  @Type(() => ServiceDetailsDto)
  @ValidateNested()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly service?: ServiceDetailsDto;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  @Expose()
  public readonly createdAt: Date;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  @Expose()
  public readonly updatedAt: Date;
}
