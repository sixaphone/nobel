import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CostUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly unit?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  public readonly price?: number;
}
