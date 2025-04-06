import { useGetSessions } from './services';

export const useGetCurSession = (id: number) => {
  const { data: sessions } = useGetSessions();
  return sessions?.find((a) => a.id === id);
};
