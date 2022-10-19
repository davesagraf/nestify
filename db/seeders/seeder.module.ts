import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UserModule } from 'src/user/user.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule],
  providers: [Logger, SeederService],
})
export class SeederModule {}
