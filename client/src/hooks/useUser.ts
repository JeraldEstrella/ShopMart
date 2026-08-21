import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '../lib/query.Client';
import userService from '../services/user.service';
import type { UserData } from '../types/user.types';

export function useUser(id?: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUser(id!),
    enabled: !!id,
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: (userData: UserData) => userService.updateUser(userData),

    onSuccess: (_, data) => {
      queryClient.invalidateQueries({
        queryKey: ['user', data.id],
      });
    },
  });
}
