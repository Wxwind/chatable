import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserByOAuth, CreateUserDto } from './dto/create-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CryptoUtils } from '@/utils/encrypt';
import { UserThirdAuthService } from '@/user-third-auth/user-third-auth.service';
import { UserThirdAuth } from '@/user-third-auth/user-third-auth.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private userThirdAuthService: UserThirdAuthService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  async findById(id: number): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: {
        phone,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(dto);
    user.password = await CryptoUtils.encrypt(user.password);
    const newUser = await this.userRepo.save(user);
    return newUser;
  }

  async createByThird(dto: CreateUserByOAuth): Promise<User> {
    const { openId, avatar, username, platform } = dto;
    const res = await this.entityManager.transaction(async (entityManager) => {
      const user = entityManager.create(User, { avatar, username });
      const savedUser = await entityManager.save(user);

      const userThirdAuth = entityManager.create(UserThirdAuth, { openId, platform, user: savedUser });
      await entityManager.save(userThirdAuth);

      return user;
    });

    return res;
  }
}
