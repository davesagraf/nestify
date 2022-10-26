import {
  Controller,
  Request,
  Body,
  Res,
  Post,
  Get,
  UseGuards,
  HttpStatus,
  HttpException,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../user/user.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  @UsePipes(ValidationPipe)
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res,
  ): Promise<User> {
    if (await this.userService.ifUserExists(createUserDto)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'a User with this Email already exists.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userService.createUser(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
    });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  async getProfile(@Request() req): Promise<any> {
    return await this.userService.getUserProfile(req.user.id);
  }
}
