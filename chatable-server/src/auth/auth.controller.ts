import { LoginVo } from '@/auth/vo';

import { Controller, Post, UseGuards, Request, Get, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/user.dto';
import { CreateUserVo } from '@/user/user.vo';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from '@/auth/dto';
import { RequestWithAuth } from './type';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginVo> {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('username or password incorrect');
    }

    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<CreateUserVo> {
    const { password, deletedAt, ...user } = await this.userService.saveUser(body);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: RequestWithAuth) {
    return req.user;
  }
}
