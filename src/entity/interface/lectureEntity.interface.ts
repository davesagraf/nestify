import { User } from '../user.entity';
import { IBaseEntity } from './baseEntity.interface';

export interface ILectureData {
  image: string;
  theme: string;
  links: string[];
}

export interface ILecture extends IBaseEntity {
  title: string;
  content: string;
  data: ILectureData;
  user: User;
}
