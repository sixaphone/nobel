import { registerAs } from '@nestjs/config';
import { ConfigKey } from '@config/config-key.enum';

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export default registerAs(
  ConfigKey.JWT,
  (): JwtConfig => ({
    expiresIn: process.env.JWT_EXPIRATION_TIME ?? '60s',
    secret: process.env.JWT_SECRET,
  }),
);
