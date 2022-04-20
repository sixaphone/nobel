import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ServicingTypeCreateDto {
  @IsString()
  @ApiProperty()
  public readonly name: string;

  @IsNumber()
  @ApiProperty()
  public readonly points: number;

  @IsBoolean()
  @ApiProperty()
  public readonly triggersListUpdate: boolean;
}
