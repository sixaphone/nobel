import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ServicingTypeDetailsDto {
  @IsUUID()
  @ApiProperty()
  @Expose()
  public readonly id: string;

  @IsString()
  @ApiProperty()
  @Expose()
  public readonly name: string;

  @IsNumber()
  @ApiProperty()
  @Expose()
  public readonly points: number;

  @IsBoolean()
  @ApiProperty()
  @Expose()
  public readonly triggersListUpdate: boolean;
}
