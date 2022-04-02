import { registerAs } from '@nestjs/config';

export default registerAs('jwt', (): { secret: string; expiresIn: string } => ({
  expiresIn: process.env.JWT_EXPIRATION_TIME ?? '60s',
  secret: process.env.JWT_SECRET,
}));
