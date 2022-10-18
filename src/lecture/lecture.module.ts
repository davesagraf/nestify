import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from 'src/entity/lecture.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture]), UserModule],
  controllers: [LectureController],
  providers: [LectureService, UserModule],
  exports: [LectureService],
})
export class LectureModule {}
