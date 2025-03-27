import { User } from '@/user/user.entity';

export type JwtPayLoad = {
  username: string;
  userId: number;
};
export type RequestWithAuth = Request & { user: JwtPayLoad };

export type GithubProfile = {
  id: string;
  username: string;
  emails: string;
  avatar_url: string;
};

export type GithubPayLoad = {
  profile: GithubProfile;
  user: User | null;
};

export type RequestWithGithub = Request & { user: GithubPayLoad };
