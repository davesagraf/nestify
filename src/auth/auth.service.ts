import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findUser(username);
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {
        const { password, ...result } = user;
        return result;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'wrong Email or Password.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return { 
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
