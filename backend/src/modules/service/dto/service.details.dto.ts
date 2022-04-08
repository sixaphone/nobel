import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ServiceDetailsDto {
  @IsUUID()
  @ApiProperty()
  @Expose()
  public readonly id: string;

  @IsString()
  @ApiProperty()
  @Expose()
  public name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Expose()
  public code?: string;

  @IsNumber()
  @ApiProperty()
  @Expose()
  public cost: number;
}
