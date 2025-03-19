import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { CreateUserVo } from './vo/create-user.vo';
import { ApiException } from '@/common/apiException';
import { ErrorCode } from '@/common/api/errorCode';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async register(@Body() dto: CreateUserDto): Promise<CreateUserVo> {
    const existingUser = await this.userService.findByUsername(dto.username);
    if (existingUser) {
      throw new ApiException(ErrorCode.USERNAME_ALREADY_EXISTS);
    }

    const user = await this.userService.saveUser(dto);
    const vo = new CreateUserVo();
    vo.id = user.id;
    vo.nickname = user.nickname;
    vo.updateTime = user.updateTime;
    vo.createTime = user.createTime;
    vo.username = user.username;
    return vo;
  }
}
