import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/entity/user.entity';

export class CreateUserDto extends User {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
