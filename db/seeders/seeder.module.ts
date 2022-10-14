import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Seeder } from './seeder';

@Module({
  imports: [TypeOrmModule, UserModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
