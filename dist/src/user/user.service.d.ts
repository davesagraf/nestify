import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { User } from 'src/entity/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    findUser(username: string): Promise<User | undefined>;
    deleteUser(id: string): Promise<void>;
}
