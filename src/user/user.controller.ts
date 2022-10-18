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
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:userId')
  getUserById(@Param('userId') id: string, @Request() req): Promise<User> {
    if (req.user.id === +id) {
      return this.userService.getUserById(+id);
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
  getAllUserLectures(
    @Param('userId') userId: string,
    @Request() req,
  ): Promise<User[]> {
    if (req.user.id === +userId) {
      return this.userService.getAllUserLectures(+userId);
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
  deleteUser(@Param('userId') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Put('/:userId')
  update(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }
}
