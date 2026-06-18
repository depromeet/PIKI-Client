import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import type { ApiErrorResponseT } from '@/types/api';

import { postTournamentItemLink } from '../_apis/postTournamentItemLink';

export const usePostTournamentItemLink = (tournamentId: number) => {
  const queryClient = useQueryClient();

  const { mutate: postTournamentItemLinkMutation, isPending: isPostTournamentItemLinkPending } =
    useMutation({
      mutationFn: (url: string) => postTournamentItemLink(tournamentId, url),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tournament', tournamentId] });
      },
      onError: error => {
        if (!isAxiosError<ApiErrorResponseT>(error) || !error.response) return;

        const {
          status,
          data: { detail },
        } = error.response;

        if (status < 500) {
          const clientErrorMessage = detail ?? '요청을 처리하지 못했습니다.';
          toast.error(clientErrorMessage);
          return;
        }

        throw error;
      },
    });

  return { postTournamentItemLinkMutation, isPostTournamentItemLinkPending };
};
