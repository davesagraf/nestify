import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Lecture } from './lecture.entity';
import { UserRole } from '../entity/interface/userEntity.interface';
import { BaseEntity } from './baseEntity';

@Entity()
export class User extends BaseEntity {
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.REGULAR,
  })
  role: UserRole;

  @Column({ unique: true })
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

  @JoinTable({
    name: 'user_lectures',
  })
  @ManyToMany(() => Lecture, (lecture) => lecture.users, { cascade: true })
  lectures: Lecture[];

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
