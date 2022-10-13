import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Lecture } from './lecture.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  REGULAR = 'REGULAR',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.REGULAR,
  })
  role: UserRole;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Lecture, (lecture) => lecture.user)
  lectures: Lecture[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
