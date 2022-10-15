import {
  IsNotEmpty,
  IsString,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { ILectureData } from 'src/entity/interface/lectureEntity.interface';
import { Lecture } from 'src/entity/lecture.entity';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

export class CreateLectureDto extends Lecture {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  content: string;

  @ValidateNested()
  data: ILectureData;

  @IsObject()
  user: CreateUserDto;
}
