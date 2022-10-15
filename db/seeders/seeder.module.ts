import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UserModule } from 'src/user/user.module';
import { Seeder } from './seeder';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
