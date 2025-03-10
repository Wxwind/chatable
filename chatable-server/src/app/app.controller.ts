import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UserForAuth } from '@/user/type';
import { Public } from '@/decorator';
import { Request as EXRequest } from 'express';
import { LoginVo } from './vo';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req: EXRequest & { user: UserForAuth }): Promise<LoginVo> {
    // user 属性是LocalStrategy validate的返回值
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req: EXRequest & { user: UserForAuth }) {
    return req.user;
  }
}
