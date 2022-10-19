import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from 'src/entity/lecture.entity';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository, UpdateResult } from 'typeorm';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
    private readonly userService: UserService,
  ) {}

  async createLecture(createLectureDto: CreateLectureDto) {
    return await this.lectureRepository.save(createLectureDto);
  }

  async applyLecture({ lectureId, userIds }): Promise<Omit<User, 'password'>[]> {
    const lectureToApply = await this.lectureRepository.findOneBy({
      id: lectureId,
    });
    const usersToApply = await this.userService.getManyUsersById(userIds);
    lectureToApply.users = usersToApply;
    await this.lectureRepository.save(lectureToApply);
    return usersToApply;
  }

  async getAllLectures(): Promise<Lecture[]> {
    return await this.lectureRepository.find();
  }

  async getAllLectureUsers(lectureId: number): Promise<Omit<User, 'password'>[]> {
    const allLectureUsers = await this.lectureRepository.findOne({
      where: { id: lectureId },
      relations: ['users'],
    });
    const users = allLectureUsers.users;
    return users;
  }

  async getLecture(id: number): Promise<Lecture> {
    return await this.lectureRepository.findOneBy({ id: id });
  }

  async updateLecture(
    id: number,
    updateLectureDto: UpdateLectureDto,
  ): Promise<UpdateResult> {
    return await this.lectureRepository.update(id, {
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
