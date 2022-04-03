import { registerAs } from '@nestjs/config';
import { ConfigKey } from '@config/config-key.enum';

export interface AppConfig {
  port: number;
}

export default registerAs(
  ConfigKey.APP,
  (): AppConfig => ({
    port: process.env.PORT ? +process.env.PORT : 3000,
  }),
);
