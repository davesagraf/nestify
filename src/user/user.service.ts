import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { User } from 'src/entity/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { IUser } from 'src/entity/interface/userEntity.interface';
import { users } from 'db/seeders/usersData';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async ifUserExists(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (userExists) return true;
    else return false;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const password = hashPassword(createUserDto.password);

    const newUser = { ...createUserDto, password };

    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      role: updateUserDto.role,
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getManyUsersById(userIds: number[]): Promise<User[]> {
    return this.userRepository.find({
      where: { id: In(userIds) },
    });
  }

  async getAllUserLectures(userId: number): Promise<any[]> {
    const allUserLectures = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['lectures'],
    });
    const lectures = allUserLectures.lectures;
    const lecturesToReturn = lectures.map(({ users, ...rest }) => rest);
    return lecturesToReturn;
  }

  getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: id },
    });
  }

  async findUser(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email: username });
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  seedUsers(): Array<Promise<User>> {
    return users.map(async (user: IUser) => {
      return await this.userRepository
        .findOneBy({ firstName: user.firstName })
        .then(async (dbUser) => {
          if (dbUser) {
            return Promise.resolve(null);
          }
          const password = hashPassword(user.password);

          const newUser = { ...user, password };

          return Promise.resolve(await this.userRepository.save(newUser));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
