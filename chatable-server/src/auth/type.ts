import { User } from '@/user/user.entity';
import type { Request } from 'express';

export type JwtPayLoad = {
  username: string;
  userId: number;
};

export type GithubProfile = {
  id: string;
  // 用户名
  username: string;
  // 头像
  photos: { value: string }[];
  // 主页
  profileUrl: string;
  _json: {
    // 似乎等于username
    login: string;
    // 等于外层的id但是是number
    id: number;
    avatar_url: string;
  };
};

export type GithubProfile2 = {
  id: string;
  // 用户名
  login: string;
  // 头像
  avatar_url: string;
};

export type GithubPayLoad = {
  profile: GithubProfile;
  user: User | null;
};

export type RequestWithGithub = Request & { user: GithubPayLoad };
