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
    createdAt: '2022-10-15T16:50:53.553472514Z',
    updatedAt: '2022-10-18T16:55:53.553472514Z',
  },
];
