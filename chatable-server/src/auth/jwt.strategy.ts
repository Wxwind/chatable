import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { JwtPayLoad } from './type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // 返回值将会附加到user对象上
  // 也可以返回一个数组，其中第一个值用于创建 user 对象，第二个值用于创建 authInfo 对象
  override async validate(payload: JwtPayLoad) {
    return { userId: payload.userId, username: payload.username };
  }
}
