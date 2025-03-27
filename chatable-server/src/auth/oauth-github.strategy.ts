// src/auth/strategies/github.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/config/type';
import { ApiException } from '@/common/apiException';
import { ErrorCode } from '@/common/api/errorCode';
import { GithubPayLoad } from './type';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private authService: AuthService,
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
  async validate(accessToken: string, refreshToken: string, profile: any): Promise<GithubPayLoad> {
    // 这时候github callback也执行完了
    // 提取 GitHub 用户信息
    const { id, username, emails, avatar_url } = profile;
    console.log('github profile', profile);
    const email = emails?.[0]?.value;

    // 查找用户
    const user = await this.authService.findByGithubId({
      githubId: id,
      username,
    });

    return {
      profile,
      user,
    };
  }
}
