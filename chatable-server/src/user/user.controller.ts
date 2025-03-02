import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';
import { CreateUserVo } from './vo';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async register(@Body() dto: CreateUserDto): Promise<CreateUserVo> {
    const user = await this.userService.register(dto);
    const vo = new CreateUserVo();
    vo.id = user.id;
    vo.nickname = user.nickname;
    vo.updateTime = user.updateTime;
    vo.createTime = user.createTime;
    vo.username = user.username;
    return vo;
  }
}
