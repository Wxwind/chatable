import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from './type';
import { LoginVo } from '@/auth/vo';
import { User } from '@/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);

    if (user && password === user.password) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<LoginVo> {
    const payload: JwtPayLoad = { username: user.username, userId: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
