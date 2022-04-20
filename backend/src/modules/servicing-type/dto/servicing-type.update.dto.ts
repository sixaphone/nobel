import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ServicingTypeUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly name?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  public readonly points?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  public readonly triggersListUpdate?: boolean;
}
