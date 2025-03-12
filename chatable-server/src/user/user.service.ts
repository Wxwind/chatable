import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBO } from './type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async findOne(username: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  async add(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create([dto]);
    const newUsers = await this.userRepo.save(user);
    return newUsers[0];
  }
}
