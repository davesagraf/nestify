import { IBaseEntity } from './baseEntity.interface';
import { IUser } from './userEntity.interface';

export interface ILectureData {
  image: string;
  theme: string;
  links: string[];
}

export interface IApplyData {
  lectureId: number;
  userIds: number[];
}

export interface ILecture extends IBaseEntity {
  title: string;
  content: string;
  data: ILectureData;
  users: IUser[];
}
