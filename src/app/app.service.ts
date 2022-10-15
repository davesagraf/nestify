import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Seeder } from 'db/seeders/seeder';
import { SeederModule } from 'db/seeders/seeder.module';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  onApplicationBootstrap(): any {
    //перенёс логику из файла src/seed.ts сюда, а там закомментил
    NestFactory.createApplicationContext(SeederModule)
      .then((appContext) => {
        const logger = appContext.get(Logger);
        const seeder = appContext.get(Seeder);
        seeder
          .seed()
          .then(() => {
            logger.debug('Seeding complete!');
          })
          .catch((error) => {
            logger.error('Seeding failed!');
            throw error;
          })
          .finally(() => appContext.close());
      })
      .catch((error) => {
        throw error;
      });
  }
}
