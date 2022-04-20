import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from '@config/config-key.enum';
import { ClientModule } from '@client/client.module';
import { CostModule } from '@cost/cost.module';
import { ServicingTypeModule } from '@servicing-type/servicing-type.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<PostgresConnectionOptions>(ConfigKey.DATABASE),
    }),
    AuthModule,
    UserModule,
    CostModule,
    ClientModule,
    CostModule,
    ServicingTypeModule,
  ],
})
export class AppModule {}
