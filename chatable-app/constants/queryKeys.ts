export const queryKeys = {
  session: (id: number) => ['user', 'session', id],
  sessions: () => ['user', 'sessions'],
  user: () => ['user'],
};
