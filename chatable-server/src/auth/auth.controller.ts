import { LoginVo } from '@/app/vo';
import { Public } from '@/decorator';
import { UserForAuth } from '@/user/type';
import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Request as EXRequest } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: EXRequest & { user: UserForAuth }): Promise<LoginVo> {
    // user 属性是LocalStrategy validate的返回值
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.userService.add(body);
  }

  @Get('profile')
  getProfile(@Request() req: EXRequest & { user: UserForAuth }) {
    return req.user;
  }
}
