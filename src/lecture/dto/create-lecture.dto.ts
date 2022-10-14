import {
  IsNotEmpty,
  IsString,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

export class CreateLectureDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  content: string;

  @ValidateNested()
  data: {
    image: string;
    theme: string;
    links: string[];
  };

  @IsObject()
  user: CreateUserDto;
}
