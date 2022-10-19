import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Request,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/entity/interface/userEntity.interface';
import { Lecture } from 'src/entity/lecture.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { User } from '../entity/user.entity';
import { UserService } from '../user/user.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:userId')
  async getUserById(@Param('userId') id: string, @Request() req): Promise<User> {
    if (req.user.id === +id) {
      return await this.userService.getUserById(+id);
    }
    if (req.user.id !== +id && req.user.role === 'ADMIN') {
      return await this.userService.getUserById(+id);
    }
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: `Sorry, you can see only your own data.`,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:userId/lectures')
  async getAllUserLectures(
    @Param('userId') userId: string,
    @Request() req,
  ): Promise<Omit<Lecture[], 'users'>> {
    if (req.user.id === +userId) {
      return await this.userService.getAllUserLectures(+userId);
    }
    if (req.user.id !== +userId && req.user.role === 'ADMIN') {
      return await this.userService.getAllUserLectures(+userId);
    }
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: `Sorry, you can see only your own data.`,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/:userId')
  async deleteUser(@Param('userId') id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Put('/:userId')
  async update(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(+id, updateUserDto);
  }
}
