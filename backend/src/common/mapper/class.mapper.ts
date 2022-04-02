import { classToPlain, plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassMapper {
  public map<E, T>(plain: E[], targetClass: { new (...args: any[]): T }): T[];
  public map<E, T>(plain: E, targetClass: { new (...args: any[]): T }): T;
  public map<E, T>(
    plain: E | E[],
    targetClass: { new (...args: any[]): T },
  ): T | T[] {
    return plainToClass(targetClass, classToPlain(plain));
  }
}
