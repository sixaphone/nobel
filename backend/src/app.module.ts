import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@config/config.module';

@Module({
  imports: [ConfigModule, AuthModule, UserModule],
})
export class AppModule {}
