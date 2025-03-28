import { LoginVo } from '@/auth/vo/login.vo';

import { Controller, Post, UseGuards, Request, Get, Body, Req, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from '@/auth/dto/login.dto';
import { JwtPayLoad, RequestWithGithub } from './type';
import { ApiBearerAuth, ApiOAuth2, ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ApiException } from '@/common/apiException';
import { ErrorCode } from '@/common/api/errorCode';
import { AccountType, getAccountType } from '@/utils/getAccountType';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@/decorator';
import { GithubLoginCallbackQuery } from './dto/github-login-callback.query';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('github/login')
  @UseGuards(AuthGuard('github'))
  @ApiOAuth2(['read:user'])
  async loginByGithub() {
    // 跳转到github登录
  }

  @Get('github/login/callback')
  @UseGuards(AuthGuard('github'))
  @ApiQuery({ type: GithubLoginCallbackQuery })
  @ApiOkResponse({ type: LoginVo })
  async loginByGithubCallback(@Req() req: RequestWithGithub): Promise<LoginVo> {
    const { user, profile } = req.user;
    // 如果不存在则创建
    if (user === null) {
      const savedUser = await this.authService.findOrCreateUserByGitHub({
        githubId: profile.id,
        username: profile.username,
        avatar: profile.avatar_url,
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
  async bindGithub(@User() user: JwtPayLoad) {
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
    const user = await this.userService.create(body);
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@User() user: JwtPayLoad) {
    return user;
  }
}
