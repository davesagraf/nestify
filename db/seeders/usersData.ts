import { IUser, UserRole } from 'src/entity/interface/userEntity.interface';

export const users: IUser[] = [
  {
    id: 1,
    role: UserRole.ADMIN,
    email: 'fucking@dumbass.com',
    password: 'fuckingdumbass13',
    firstName: 'Fucking',
    lastName: 'Dumbass',
    isActive: true,
    lectures: [],
  },
];
