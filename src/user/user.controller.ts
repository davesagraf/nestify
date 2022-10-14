import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/entity/interface/userEntity.interface';
import { RolesGuard } from 'src/guards/roles.guard';
import { User } from '../entity/user.entity';
import { UserService } from '../user/user.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:userId')
  getUserById(@Param('userId', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Put(':userId')
  update(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }
}
