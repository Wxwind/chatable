import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiException } from '@/common/apiException';
import { ErrorCode } from '@/common/api/errorCode';
import { AccountType, getAccountType } from '@/utils/getAccountType';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { JwtPayLoad } from '@/auth/type';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserJWT } from '@/decorator';
import { GetProfileVo } from './vo/get-profile.vo';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async register(@Body() dto: CreateUserDto): Promise<undefined> {
    const accountType = getAccountType(dto.account);
    switch (accountType) {
      case AccountType.EMAIL: {
        const existingUser = await this.userService.findByEmail(dto.username);
        if (existingUser) {
          throw new ApiException(ErrorCode.REGISTER_EMAIL_ALREADY_EXISTS);
        }
        const user = await this.userService.create(dto);

        break;
      }
      case AccountType.PHONE: {
        const existingUser = await this.userService.findByPhone(dto.username);
        if (existingUser) {
          throw new ApiException(ErrorCode.REGISTER_PHONE_ALREADY_EXISTS);
        }
        const user = await this.userService.create(dto);

        break;
      }
      case AccountType.INVALID:
      default:
        // 理论上不会执行到这里
        throw new ApiException(ErrorCode.LOGIN_USER_INVALID_ACCOUNT_TYPE);
    }

    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  async getProfile(@UserJWT() jwt: JwtPayLoad): Promise<GetProfileVo> {
    const user = await this.userService.findById(jwt.userId);
    if (user === null) {
      throw new ApiException(ErrorCode.USER_NOT_FOUND);
    }

    const vo = new GetProfileVo();
    vo.username = user.username;
    vo.avatar = user.avatar;
    return user;
  }
}
