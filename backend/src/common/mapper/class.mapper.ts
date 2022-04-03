import { instanceToPlain, plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassMapper {
  public map<E, T>(
    plain: E[],
    targetClass: { new (...args: any[]): T },
    transformFn?: (dto: T, ...args: any[]) => T,
  ): T[];
  public map<E, T>(
    plain: E,
    targetClass: { new (...args: any[]): T },
    transformFn?: (dto: T, ...args: any[]) => T,
  ): T;
  public map<E, T>(
    plain: E | E[],
    targetClass: { new (...args: any[]): T },
    transformFn?: (dto: T) => T,
  ): T | T[] {
    const dto = plainToClass(targetClass, instanceToPlain(plain));

    return transformFn ? transformFn(dto) : dto;
  }
}
