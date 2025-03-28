// src/auth/strategies/github.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/config/type';
import { GithubPayLoad, GithubProfile } from './type';
import { UserThirdAuthService } from '@/user-third-auth/user-third-auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private authService: AuthService,
    private userThirdService: UserThirdAuthService,
    private configService: ConfigService<EnvironmentVariables>
  ) {
    super({
      clientID: configService.get('OAUTH_GITHUB_CLIENT_ID', { infer: true })!,
      clientSecret: configService.get('OAUTH_GITHUB_CLIENT_SECRET')!,
      callbackURL: configService.get('OAUTH_GITHUB_CALLBACK_URL')!,
      scope: ['read:user'], // 	授予对用户个人资料数据的读取权限
    });
  }

  // 返回值会附加到user上
  async validate(accessToken: string, refreshToken: string, profile: GithubProfile): Promise<GithubPayLoad> {
    // 这时候github callback也执行完了
    console.log('github profile', profile);
    // 查找用户
    const user = await this.userThirdService.findByGitHubId(profile.id);

    return {
      profile,
      user,
    };
  }
}
