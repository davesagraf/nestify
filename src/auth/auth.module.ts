import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from '../auth/local.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('API_SECRET'),
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
