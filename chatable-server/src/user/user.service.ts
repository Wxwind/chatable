import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserByOAuth, CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoUtils } from '@/utils/encrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

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

  async findByGithubId(id: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: {
        githubId: id,
      },
    });
    return user;
  }

  async saveUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(dto);
    user.password = await CryptoUtils.encrypt(user.password);
    const newUser = await this.userRepo.save(user);
    return newUser;
  }

  async createByThird(dto: CreateUserByOAuth): Promise<User> {}
}
