import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from './type';
import { UserForAuth } from '@/user/type';
import { LoginVo } from '@/auth/vo';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<UserForAuth | null> {
    const user = await this.usersService.findOne(username);

    if (user && password === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserForAuth): Promise<LoginVo> {
    const payload: JwtPayLoad = { username: user.username, userId: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
