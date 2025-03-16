import { LoginVo } from '@/auth/vo';
import { UserForAuth } from '@/user/type';
import { Controller, Post, UseGuards, Request, Get, Body, UnauthorizedException } from '@nestjs/common';
import { Request as EXRequest } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/user.dto';
import { CreateUserVo } from '@/user/user.vo';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from '@/auth/dto';

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
    const { password, deletedAt, ...user } = await this.userService.add(body);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: EXRequest & { user: UserForAuth }) {
    return req.user;
  }
}
