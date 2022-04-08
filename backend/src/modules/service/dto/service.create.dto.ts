import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ServiceCreateDto {
  @IsString()
  @ApiProperty()
  public name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public code?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  public cost?: number;
}
