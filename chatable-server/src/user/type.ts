export type UserBO = {
  id: number;
  username: string;
  password: string;
  nickname: string;
  createTime: Date;
  updateTime: Date;
  deletedAt: Date | null;
};

export type UserForAuth = Omit<UserBO, 'password'>;
