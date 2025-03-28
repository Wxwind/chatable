import { Module } from '@nestjs/common';
import { UserThirdAuthService } from './user-third-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserThirdAuth } from './user-third-auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserThirdAuth])],
  providers: [UserThirdAuthService],
  exports: [UserThirdAuthService],
})
export class UserThirdAuthModule {}
