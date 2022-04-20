import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ClientDetailsDto } from '@client/dto/client.details.dto';
import { ServiceDetailsDto } from '@service/dto/service.details.dto';
import { ServicingStatus } from '@servicing/servicing.status';

export class ServicingDetailsDto {
  @IsUUID()
  @ApiProperty()
  @Expose()
  public readonly userId: string;

  @IsUUID()
  @ApiProperty()
  @Expose()
  public readonly clientId: string;

  @IsUUID()
  @ApiProperty()
  @Expose()
  public readonly serviceId: string;

  @IsOptional()
  @Type(() => ClientDetailsDto)
  @ValidateNested()
  @ApiProperty()
  @Expose()
  public readonly client?: ClientDetailsDto;

  @IsOptional()
  @Type(() => ServiceDetailsDto)
  @ValidateNested()
  @ApiProperty()
  @Expose()
  public readonly service?: ServiceDetailsDto;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty()
  @Expose()
  public readonly servicedAt?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly workerComment?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly managerComment?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly paymentMethod?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly typeId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly currency?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly price?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly handsCost?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public readonly serviceAtHours?: string;

  @IsEnum(ServicingStatus)
  @ApiProperty()
  @Expose()
  public readonly status: ServicingStatus;
}
