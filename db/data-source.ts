import { DataSource, DataSourceOptions } from 'typeorm';
import 'reflect-metadata';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dave',
  password: 'mazomedik',
  database: 'nestify_db',
  synchronize: true,
  logging: false,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
