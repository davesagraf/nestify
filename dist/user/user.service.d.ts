import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserEntity } from 'src/entity/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
    getAllUsers(): Promise<UserEntity[]>;
    getUserById(id: number): Promise<UserEntity>;
    deleteUser(id: string): Promise<void>;
}
