import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from 'src/entity/lecture.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
  ) {}

  createLecture(createLectureDto: CreateLectureDto) {
    return this.lectureRepository.save(createLectureDto);
  }

  getAllLectures(): Promise<Lecture[]> {
    return this.lectureRepository.find();
  }

  getAllLectureUsers(lectureId: number): Promise<Lecture[]> {
    return this.lectureRepository.find({
      relations: ['users'],
      where: { users: { lectures: { id: lectureId } } },
    });
  }

  getLecture(id: number): Promise<Lecture> {
    return this.lectureRepository.findOneBy({ id: id });
  }

  updateLecture(
    id: number,
    updateLectureDto: UpdateLectureDto,
  ): Promise<UpdateResult> {
    return this.lectureRepository.update(id, {
      title: updateLectureDto.title,
      content: updateLectureDto.content,
      data: updateLectureDto.data,
      users: updateLectureDto.users,
    });
  }

  async deleteLecture(id: number): Promise<void> {
    await this.lectureRepository.delete(id);
  }
}
