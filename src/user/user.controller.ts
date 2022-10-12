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
import { User } from '../entity/user.entity';
import { UserService } from '../user/user.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:userId')
  getUserById(@Param('userId', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  deleteUser(@Param('userId') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId')
  update(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }
}
