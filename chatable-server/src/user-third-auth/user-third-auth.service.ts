import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserThirdAuth, UserThirdAuthPlatform } from './user-third-auth.entity';
import { Repository } from 'typeorm';
import { User } from '@/user/user.entity';

@Injectable()
export class UserThirdAuthService {
  constructor(
    @InjectRepository(UserThirdAuth)
    private userThirdAuthRepo: Repository<UserThirdAuth>
  ) {}

  async createByGitHub(params: { user: User; openId: string; platform: UserThirdAuthPlatform }): Promise<UserThirdAuth> {
    const userThirdAuth = this.userThirdAuthRepo.create(params);
    return await this.userThirdAuthRepo.save(userThirdAuth);
  }

  async findByGitHubId(id: string): Promise<User | null> {
    const userThirdAuth = await this.userThirdAuthRepo.findOne({
      where: {
        openId: id,
        platform: UserThirdAuthPlatform.GITHUB,
      },
      relations: ['user'],
    });
    return userThirdAuth?.user || null;
  }
}
