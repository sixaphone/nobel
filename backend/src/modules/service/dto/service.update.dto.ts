import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ServiceUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  public name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public code?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  public cost?: number;
}
