import { Lecture } from '../lecture.entity';
import { IBaseEntity } from './baseEntity.interface';

export enum UserRole {
  ADMIN = 'ADMIN',
  REGULAR = 'REGULAR',
}

export interface IUser extends IBaseEntity {
  role: UserRole;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  lectures: Lecture[];
}
