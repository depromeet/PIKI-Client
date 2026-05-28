import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postCreateTournament } from '../_apis/postCreateTournament';

export const usePostCreateTournament = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postCreateTournament,
    onSuccess: ({ tournamentId }) => {
      // 홈의 진행 중인 토너먼트 리스트 갱신
      queryClient.invalidateQueries({ queryKey: ['tournamentList'] });
      // TODO: 토너먼트 히스토리 쿼리 연결되면 함께 invalidate
      router.push(`/tournament/${tournamentId}/create`);
    },
  });

  return { mutate, isPending };
};
