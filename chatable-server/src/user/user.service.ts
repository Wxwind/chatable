import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  async saveUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(dto);
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await this.userRepo.save(user);
    return newUser;
  }
}
