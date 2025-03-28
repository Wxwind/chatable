import { User } from '@/user/user.entity';
import type { Request } from 'express';

export type JwtPayLoad = {
  username: string;
  userId: number;
};

export type GithubProfile = {
  id: string;
  username: string;
  emails: { value: string }[];
  avatar_url: string;
};

export type GithubPayLoad = {
  profile: GithubProfile;
  user: User | null;
};

export type RequestWithGithub = Request & { user: GithubPayLoad };
