import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  // 允许使用 @InjectRepository() 装饰器将 UserRepository 注入到 UserService 中：
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  // TypeOrmModule 表示其他模块导入UserModule后可以在其providers中使用 @InjectRepository(User)。
  exports: [UserService, TypeOrmModule],
  controllers: [UserController],
})
export class UserModule {}
