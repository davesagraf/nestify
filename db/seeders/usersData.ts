import { IUser, UserRole } from 'src/entity/interface/userEntity.interface';

export const users: IUser[] = [
  {
    id: 1,
    role: UserRole.ADMIN,
    email: 'admin@email.com',
    password: 'adminpass',
    firstName: 'Admin',
    lastName: 'Admin',
    isActive: true,
    lectures: [],
  },
];
