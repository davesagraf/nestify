import { DataSource, DataSourceOptions } from 'typeorm';
import 'reflect-metadata';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'host.docker.internal',
  port: 5432,
  username: 'postgres',
  password: 'postgrespw',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
