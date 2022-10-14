import { User } from '../user.entity';

export interface ILecture {
  id: number;

  title: string;

  content: string;
  data: {
    image: string;
    theme: string;
    links: string[];
  };
  user: User;
}
