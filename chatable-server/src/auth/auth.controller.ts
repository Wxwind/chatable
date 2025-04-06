import { LoginVo } from '@/auth/vo/login.vo';

import { Controller, Post, UseGuards, Request, Get, Body, Req, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from '@/auth/dto/login.dto';
import { GithubProfile, GithubProfile2, JwtPayLoad, RequestWithGithub } from './type';
import { ApiBearerAuth, ApiOAuth2, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { ApiException } from '@/common/apiException';
import { ErrorCode } from '@/common/api/errorCode';
import { AccountType, getAccountType } from '@/utils/getAccountType';
import { AuthGuard } from '@nestjs/passport';
import { UserJWT } from '@/decorator';
import { GithubLoginCallbackQuery } from './dto/github-login-callback.query';
import { User } from '@/user/user.entity';
import { UserThirdAuth } from '@/user-third-auth/user-third-auth.entity';
import { UserThirdAuthService } from '@/user-third-auth/user-third-auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userThirdService: UserThirdAuthService,
    private userService: UserService,
    private configService: ConfigService
  ) {}

  @Post('github/login')
  //  @UseGuards(AuthGuard('github'))
  @ApiOAuth2(['read:user'])
  async loginByGithub() {
    // 跳转到github登录
  }

  @Get('github/login/callback')
  @UseGuards(AuthGuard('github'))
  @ApiQuery({ type: GithubLoginCallbackQuery })
  @ApiOkResponse({ type: LoginVo })
  async loginByGithubCallback(@Req() req: RequestWithGithub, @Query() query: { code: string; state: string }): Promise<LoginVo> {
    // const clientID = this.configService.get('OAUTH_GITHUB_CLIENT_ID', { infer: true })!;
    // const clientSecret = this.configService.get('OAUTH_GITHUB_CLIENT_SECRET')!;
    // const callbackURL = this.configService.get('OAUTH_GITHUB_CALLBACK_URL')!;
    // console.log('code', query.code);
    // const a = (await (
    //   await fetch('https://github.com/login/oauth/access_token', {
    //     method: 'post',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       client_id: clientID,
    //       client_secret: clientSecret,
    //       code: query.code,
    //       redirect_uri: callbackURL,
    //     }),
    //   })
    // ).json()) as {
    //   access_token: string;
    //   scope: string;
    //   token_type: string;
    // };

    // const b = await (
    //   await fetch('https://api.github.com/user', {
    //     method: 'get',
    //     headers: {
    //       Authorization: `Bearer ${a.access_token}`,
    //     },
    //   })
    // ).json();

    // console.log('github 返回', b);

    //  const profile = b as GithubProfile2;
    // const user = await this.userThirdService.findByGitHubId(profile.id);
    const { user, profile } = req.user;

    // 如果不存在则创建
    if (user === null) {
      const savedUser = await this.authService.findOrCreateUserByGitHub({
        githubId: profile.id,
        username: profile.username,
        avatar: profile._json.avatar_url,
      });

      const res = await this.authService.login(savedUser);
      return res;
    }
    const res = await this.authService.login(user);
    return res;
  }

  @Post('github/bind')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse()
  async bindGithub(@UserJWT() user: JwtPayLoad) {
    // TODO
  }

  @Post('login')
  @ApiOkResponse({ type: LoginVo })
  async login(@Body() dto: LoginDto): Promise<LoginVo> {
    const accountType = getAccountType(dto.account);
    switch (accountType) {
      case AccountType.PHONE: {
        // 处理手机号登录
        const user = await this.authService.validateUserByPhone(dto.account, dto.password);
        if (!user) {
          throw new ApiException(ErrorCode.LOGIN_PHONE_VERIFY_FAILED);
        }

        return this.authService.login(user);
      }
      case AccountType.EMAIL: {
        // 处理邮箱登录
        const user = await this.authService.validateUserByEmail(dto.account, dto.password);
        if (!user) {
          throw new ApiException(ErrorCode.LOGIN_EMAIL_VERIFY_FAILED);
        }

        return this.authService.login(user);
      }
      case AccountType.INVALID:
      default:
        // 理论上不会执行到这里
        throw new ApiException(ErrorCode.LOGIN_USER_INVALID_ACCOUNT_TYPE);
    }
  }

  @Post('register')
  @ApiOkResponse()
  async register(@Body() body: CreateUserDto): Promise<null> {
    const userLike: Partial<User> = { username: body.username, password: body.password };
    if (body.type === 'email') {
      userLike.email = body.account;
    } else if (body.type === 'phone') {
      userLike.phone = body.account;
    }
    const user = await this.userService.create(userLike);
    return null;
  }
}
