import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //ещё пробовал тут внутри конструктора вызывать this.configService.get('API_SECRET), после того,
  //как делал в начале import { ConfigService } from '@nestjs/config'
  //коммент сделал тут, а не ниже внутри конструктора, потому что ТС ругается
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '', //тут было jwtConstants.secret, так же не работало
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
