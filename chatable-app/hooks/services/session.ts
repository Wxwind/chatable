import { queryKeys } from '@/constants/queryKeys';
import { aiChatSessionService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useGetSessions = () => {
  return useQuery({
    queryKey: queryKeys.sessions(),
    queryFn: aiChatSessionService.aiChatSessionControllerGetSessions,
  });
};

export const useGetSession = (id: number) => {
  return useQuery({
    queryKey: queryKeys.session(id),
    queryFn: () => {
      return aiChatSessionService.aiChatSessionControllerGetHistoryMessage(id, { sessionId: id, page: 1, limit: 99 });
    },
  });
};
