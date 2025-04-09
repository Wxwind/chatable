import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from './type';
import { LoginVo } from '@/auth/vo/login.vo';
import { User } from '@/user/user.entity';
import { CryptoUtils } from '@/utils/encrypt';
import { UserThirdAuthPlatform } from '@/user-third-auth/user-third-auth.entity';
import { UserThirdAuthService } from '@/user-third-auth/user-third-auth.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private userThirdAuthService: UserThirdAuthService,
    private jwtService: JwtService
  ) {}

  async validateUserByPhone(phone: string, password: string): Promise<User | null> {
    const user = await this.userService.findByPhone(phone);

    if (user && (await CryptoUtils.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async validateUserByEmail(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);

    if (user && (await CryptoUtils.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // 查询User，不存在则创建并绑定github id
  async findOrCreateUserByGitHub(dto: { githubId: string; username: string; avatar: string }): Promise<User> {
    let user = await this.userThirdAuthService.findByGitHubId(dto.githubId);
    if (user === null) {
      user = await this.userService.createByThird({
        openId: dto.githubId,
        platform: UserThirdAuthPlatform.GITHUB,
        username: dto.username,
        avatar: dto.avatar,
      });
    }
    return user;
  }

  async login(user: User): Promise<LoginVo> {
    const payload: JwtPayLoad = { username: user.username, userId: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
