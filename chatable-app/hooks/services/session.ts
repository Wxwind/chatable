import { queryKeys } from '@/constants/queryKeys';
import { aiChatSessionService } from '@/services';
import { AIChatMessageBase } from '@/services/generated/data-contracts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetSessions = () => {
  return useQuery({
    queryKey: queryKeys.sessions(),
    queryFn: aiChatSessionService.aiChatSessionControllerGetSessions,
  });
};

export const useGetSessionMessages = (id: number) => {
  return useQuery({
    queryKey: queryKeys.session(id),
    queryFn: () => {
      return aiChatSessionService.aiChatSessionControllerGetHistoryMessage(id, { sessionId: id, page: 1, limit: 99 });
    },
  });
};

export const useCreateSession = () => {
  return useMutation({
    mutationFn: async (message: string) => {
      const result = await aiChatSessionService.aiChatSessionControllerCreateSession({
        modelName: 'theb-ai',
        initialMessage: message,
      });
      return result;
    },
  });
};

export const usePostMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: { sessionId: number; message: string }) => {
      const result = await aiChatSessionService.aiChatSessionControllerPostMessageImmediately(dto.sessionId, {
        message: dto.message,
      });
      return result;
    },
    onSuccess: (res, req) => {
      queryClient.setQueryData(queryKeys.session(req.sessionId), (old: AIChatMessageBase[]) => {
        const newUserMsg: AIChatMessageBase = {
          id: req.sessionId,
          message: req.message,
          sender: 'user',
        };
        const newAIMsg: AIChatMessageBase = {
          id: res.messageId,
          message: res.response,
          sender: 'ai',
        };
        return [...old, newUserMsg, newAIMsg];
      });
    },
  });
};
