import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from 'src/entity/lecture.entity';
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

  createLecture(createLectureDto: CreateLectureDto) {
    return this.lectureRepository.save(createLectureDto);
  }

  async applyLecture({ lectureId, userIds }) {
    const lectureToApply =  await this.lectureRepository.findOneBy({id: lectureId});
    const usersToApply = await this.userService.getManyUsersById(userIds);
    const usersToReturn = usersToApply.map(({password, ...rest}) => rest)
    lectureToApply.users = usersToApply;
    await this.lectureRepository.save(lectureToApply);
    return usersToReturn;
  }

  getAllLectures(): Promise<Lecture[]> {
    return this.lectureRepository.find();
  }

  async getAllLectureUsers(lectureId: number): Promise<any[]> {
    const allLectureUsers = await this.lectureRepository.findOne({where: { id: lectureId},
      relations: ['users']
    });
    const users = allLectureUsers.users;
    const usersToReturn = users.map(({password, ...rest}) => rest);
    return usersToReturn;
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
