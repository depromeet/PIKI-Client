import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { deleteTournament } from '@/apis/deleteTournament';
import type { ApiErrorResponseT } from '@/types/api';

export const useDeleteTournament = (tournamentId: number) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTournamentMutation, isPending: isDeleteTournamentPending } = useMutation({
    mutationFn: () => deleteTournament(tournamentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tournamentList'] });
      queryClient.invalidateQueries({ queryKey: ['tournament', tournamentId] });
      toast.success('토너먼트를 삭제했어요.');
    },
    onError: error => {
      if (!isAxiosError<ApiErrorResponseT>(error) || !error.response) return;

      const {
        status,
        data: { detail },
      } = error.response;

      const clientErrorMessage = detail ?? '요청을 처리하지 못했습니다.';

      // TODO: 에러 처리
      // if (status === 403 || status === 404 || status === 409) toast.error(clientErrorMessage);
      // else if (status === 500) toast.error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    },
  });

  return { deleteTournamentMutation, isDeleteTournamentPending };
};
