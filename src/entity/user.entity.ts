import { Entity, Column, OneToMany } from 'typeorm';
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

  @Exclude()
  @Column({ type: 'jsonb', nullable: true })
  @OneToMany(() => Lecture, (lecture) => lecture.user, {
    cascade: ['remove'],
  })
  lectures: Lecture[];

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
