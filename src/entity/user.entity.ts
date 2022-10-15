import { Entity, Column, OneToMany, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Lecture } from './lecture.entity';
import { UserRole } from '../entity/interface/userEntity.interface';
import { BaseEntity } from './base.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
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

  @OneToMany(() => Lecture, (lecture) => lecture.user, {
    cascade: ['remove'],
  })
  lectures: Lecture[];

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
