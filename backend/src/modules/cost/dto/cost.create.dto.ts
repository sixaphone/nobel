import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CostCreateDto {
  @IsString()
  @ApiProperty()
  public readonly name: string;

  @IsString()
  @ApiProperty()
  public readonly unit: string;

  @IsNumber()
  @ApiProperty()
  public readonly price: number;
}
