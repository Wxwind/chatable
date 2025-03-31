import { JwtPayLoad } from '@/auth/type';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserJWT = createParamDecorator<unknown, JwtPayLoad>((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
