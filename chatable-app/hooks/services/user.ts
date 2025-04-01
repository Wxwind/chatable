import { queryKeys } from '@/constants/queryKeys';
import { userService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = () => {
  return useQuery({
    queryKey: queryKeys.user(),
    queryFn: userService.userControllerGetProfile,
  });
};
