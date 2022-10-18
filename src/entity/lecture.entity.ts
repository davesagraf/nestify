import { Entity, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { ILectureData } from './interface/lectureEntity.interface';
import { BaseEntity } from './baseEntity';

@Entity()
export class Lecture extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    type: 'jsonb',
  })
  data: ILectureData;

  @ManyToMany(() => User, (user) => user.lectures)
  users: User[];
}
