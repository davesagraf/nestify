import { Lecture } from '../lecture.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  REGULAR = 'REGULAR',
}

export interface IUser {
  id: number;
  role: UserRole;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  lectures: Lecture[];
}
