import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from './type';
import { LoginVo } from '@/auth/vo/login.vo';
import { User } from '@/user/user.entity';
import { CryptoUtils } from '@/utils/encrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUserByPhone(phone: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByPhone(phone);

    if (user && (await CryptoUtils.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async validateUserByEmail(phone: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(phone);

    if (user && (await CryptoUtils.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // 查询用户，不存在创建User
  async findByGithubId(dto: { githubId: string; username: string }) {
    const user = await this.usersService.findByGithubId(dto.githubId);
    return user;
  }

  async login(user: User): Promise<LoginVo> {
    const payload: JwtPayLoad = { username: user.username, userId: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
