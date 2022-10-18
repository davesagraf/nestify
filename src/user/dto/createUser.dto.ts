import { IsEmail, IsString } from 'class-validator';
import { User } from 'src/entity/user.entity';

export class CreateUserDto extends User {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  password: string;
}
