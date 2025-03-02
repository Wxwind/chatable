export type UserBO = {
  id: number;
  username: string;
  password: string;
  nickname: string;
};

export type UserForAuth = Omit<UserBO, 'password'>;
