import { LoginVo } from '@/auth/vo/login.vo';

import { Controller, Post, UseGuards, Request, Get, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { CreateUserVo } from '@/user/vo/create-user.vo';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from '@/auth/dto/login.dto';
import { RequestWithAuth } from './type';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('login')
  @ApiOkResponse({ type: LoginVo })
  async login(@Body() loginDto: LoginDto): Promise<LoginVo> {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('username or password incorrect');
    }

    return this.authService.login(user);
  }

  @Post('register')
  @ApiOkResponse({ type: CreateUserVo })
  async register(@Body() body: CreateUserDto): Promise<CreateUserVo> {
    const { password, deletedAt, ...user } = await this.userService.saveUser(body);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req: RequestWithAuth) {
    return req.user;
  }
}
