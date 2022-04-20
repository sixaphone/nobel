import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@config/config.module';
import { DatabaseModule } from '@common/utils/database.module';

@Module({})
export class TypeormTestModule {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static forTest(entities?: Function[]): DynamicModule {
    return {
      module: TypeormTestModule,
      imports: [
        ConfigModule,
        DatabaseModule,
        TypeOrmModule.forFeature(entities),
      ],
      exports: [TypeOrmModule],
    };
  }
}
