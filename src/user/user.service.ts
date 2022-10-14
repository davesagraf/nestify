import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { User } from 'src/entity/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/entity/interface/userEntity.interface';
import { users } from 'db/seeders/usersData';

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
    const saltRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltRounds);
    createUserDto.password = hash;

    return this.userRepository.save(createUserDto);
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

  getUserById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }

  async findUser(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email: username });
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  //seed users
  seedUsers(): Array<Promise<User>> {
    return users.map(async (user: IUser) => {
      return await this.userRepository
        .findOneBy({ firstName: user.firstName })
        .then(async (dbUser) => {
          if (dbUser) {
            return Promise.resolve(null);
          }
          return Promise.resolve(await this.userRepository.save(user));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
