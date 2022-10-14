import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { ILecture } from './interface/lectureEntity.interface';

@Entity()
export class Lecture implements ILecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    type: 'jsonb',
  })
  data: {
    image: string;
    theme: string;
    links: string[];
  };

  @ManyToOne(() => User, (user) => user.lectures)
  user: User;
}
