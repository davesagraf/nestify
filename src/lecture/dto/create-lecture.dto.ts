import { IsNotEmpty, IsString, IsArray, IsObject } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

export class CreateLectureDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  content: string;

  @IsArray()
  data: [];

  @IsObject()
  user: CreateUserDto;
}
