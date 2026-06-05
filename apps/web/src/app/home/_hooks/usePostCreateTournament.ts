import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/consts/route';

import { postCreateTournament } from '../_apis/postCreateTournament';

export const usePostCreateTournament = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: postCreateTournamentMutation, isPending: isPostCreateTournamentPending } =
    useMutation({
      mutationFn: postCreateTournament,
      onSuccess: ({ tournamentId }) => {
        // 홈의 진행 중인 토너먼트 리스트 갱신
        queryClient.invalidateQueries({ queryKey: ['tournamentList'] });
        router.push(ROUTES.TOURNAMENT_CREATE(tournamentId));
      },
    });

  return { postCreateTournamentMutation, isPostCreateTournamentPending };
};
