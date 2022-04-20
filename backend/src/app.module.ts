import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@config/config.module';
import { ClientModule } from '@client/client.module';
import { CostModule } from '@cost/cost.module';
import { ServicingTypeModule } from '@servicing-type/servicing-type.module';
import { ServicingModule } from '@servicing/servicing.module';
import { DatabaseModule } from '@common/utils/database.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    CostModule,
    ClientModule,
    CostModule,
    ServicingTypeModule,
    ServicingModule,
  ],
})
export class AppModule {}
