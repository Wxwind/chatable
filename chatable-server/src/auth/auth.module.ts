import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserThirdAuthModule } from '@/user-third-auth/user-third-auth.module';
import { GithubStrategy } from './oauth-github.strategy';

@Module({
  providers: [AuthService, JwtStrategy, GithubStrategy],
  imports: [
    UserModule,
    UserThirdAuthModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
