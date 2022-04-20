import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ServicingStatus } from '@servicing/servicing.status';

export class ServicingCreateDto {
  @IsUUID()
  @ApiProperty()
  public readonly userId: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly client?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  public readonly clientId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly service?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  public readonly serviceId?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty()
  public readonly servicedAt?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly workerComment?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly managerComment?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly paymentMethod?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  public readonly typeId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly currency?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  public readonly price?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  public readonly handsCost?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly serviceAtHours?: string;

  @IsEnum(ServicingStatus)
  @IsOptional()
  @ApiProperty()
  public readonly status?: ServicingStatus;
}
