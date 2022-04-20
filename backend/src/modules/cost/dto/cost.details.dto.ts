import { IsNumber, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CostDetailsDto {
  @IsUUID()
  @ApiProperty()
  @Expose()
  public readonly id: string;

  @IsString()
  @ApiProperty()
  @Expose()
  public readonly name: string;

  @IsString()
  @ApiProperty()
  @Expose()
  public readonly unit: string;

  @IsNumber()
  @ApiProperty()
  @Expose()
  public readonly price: number;
}
