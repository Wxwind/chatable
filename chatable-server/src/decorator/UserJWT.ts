import { JwtPayLoad } from '@/auth/type';
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const UserJWT = createParamDecorator<unknown, JwtPayLoad>((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const user = request.user;
  if (!user) {
    throw new UnauthorizedException("user hasn't been logined");
  }
  return user;
});
