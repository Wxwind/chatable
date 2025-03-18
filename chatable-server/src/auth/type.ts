export type JwtPayLoad = {
  username: string;
  userId: number;
};
export type RequestWithAuth = Request & { user: JwtPayLoad };
