import { IsBoolean, IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ServicingStatus } from '@servicing/servicing.status';

export class ServicingQueryDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value === 'true' : !!value,
  )
  public readonly withRelations?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value === 'true' : !!value,
  )
  public readonly markedOnly?: boolean;

  @IsEnum(ServicingStatus)
  @IsOptional()
  @ApiProperty()
  public readonly status?: ServicingStatus;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  public readonly userId?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  public readonly clientId?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  public readonly serviceId?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty()
  public readonly servicedFrom?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty()
  public readonly servicedTo?: Date;
}
