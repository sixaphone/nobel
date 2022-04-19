import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ClientQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  @Transform(({ value }) => decodeURIComponent(value))
  public readonly list?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value === 'true' : !!value,
  )
  public readonly markedOnly?: boolean;
}
