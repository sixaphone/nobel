import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class StatusDto {
  @IsString()
  @ApiProperty()
  @Expose()
  public readonly code: string;

  @IsString()
  @ApiProperty()
  @Expose()
  public readonly title: string;

  @IsString()
  @ApiProperty()
  @Expose()
  public readonly message: string;
}
