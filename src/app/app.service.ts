import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeederService } from 'db/seeders/seeder.service';
import { SeederModule } from 'db/seeders/seeder.module';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  onApplicationBootstrap(): any {
    NestFactory.createApplicationContext(SeederModule)
      .then((appContext) => {
        const logger = appContext.get(Logger);
        const seeder = appContext.get(SeederService);
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
