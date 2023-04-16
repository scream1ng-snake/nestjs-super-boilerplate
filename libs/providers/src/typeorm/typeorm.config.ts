import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from "dotenv";
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

config({
  path: join(process.cwd(), '.env')
});

const configService = new ConfigService();

const options = (): DataSourceOptions => {
  const url = configService.get('DATABASE_URL') as string;
  if(!url) {
    throw new Error('URL базы данных не указан')
  }
  return {
    url,
    type: 'postgres',
    schema: 'public', // todo - move to env or config file
    logging: configService.get('IS_PROD') === 'false',
    entities: [
      join(process.cwd(), 'dist', 'libs', 'entities', '**', '*entity.{ts,js}')
    ],
    migrations: [join(process.cwd(), 'migrations', '**', '*migration.ts')],
    migrationsRun: true,
    migrationsTableName: 'migrations'
  }
}

export const appDataSource = new DataSource(options());