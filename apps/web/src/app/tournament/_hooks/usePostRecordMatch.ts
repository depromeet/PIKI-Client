import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postRecordMatch } from '../_apis/postRecordMatch';
import type { PostRecordMatchRequestT } from '../_types/tournamentResponse';

export const usePostRecordMatch = (tournamentId: number) => {
  const queryClient = useQueryClient();

  const { mutate: recordMatch, isPending } = useMutation({
    mutationFn: (body: PostRecordMatchRequestT) => postRecordMatch(tournamentId, body),
    onSuccess: () => {
      // 매치 기록 후 진행 상태/완료 여부가 바뀌므로 단건 조회 invalidate
      queryClient.invalidateQueries({ queryKey: ['tournament', tournamentId] });
    },
  });

  return { recordMatch, isPending };
};
