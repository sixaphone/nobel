import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import Entities from '@db/entities';
import { ConfigKey } from '@config/config-key.enum';

export default registerAs(
  ConfigKey.DATABASE,
  (): PostgresConnectionOptions => ({
    entities: Entities,
    name: 'default',
    type: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? 'all' : ['warn', 'error'],
    url: process.env.DATABASE_CONNECTION_URL,
    synchronize: process.env.DATABASE_SYNCRONIZE === 'true',
  }),
);
