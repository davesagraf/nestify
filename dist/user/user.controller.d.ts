import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserEntity } from '../entity/user.entity';
import { UsersService } from '../user/user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<UserEntity[]>;
    getUserById(id: number): Promise<UserEntity>;
    createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
    deleteUser(id: string): Promise<void>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
}
