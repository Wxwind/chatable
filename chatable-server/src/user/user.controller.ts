import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiException } from '@/common/apiException';
import { ErrorCode } from '@/common/api/errorCode';
import { AccountType, getAccountType } from '@/utils/getAccountType';

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
}
