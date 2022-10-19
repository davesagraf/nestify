import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { UserRole } from 'src/entity/interface/userEntity.interface';
import { CreateUserDto } from './createUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEnum(UserRole)
  public role: UserRole;
}
