import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postRecordMatch } from '../_apis/postRecordMatch';
import type {
  PostRecordMatchRequestT,
  PostRecordMatchResponseT,
} from '../_types/tournamentResponse';

type UsePostRecordMatchArgs = {
  tournamentId: number;
  onSuccess?: (data: PostRecordMatchResponseT) => void;
};

export const usePostRecordMatch = ({ tournamentId, onSuccess }: UsePostRecordMatchArgs) => {
  const queryClient = useQueryClient();

  const { mutate: postRecordMatchMutation, isPending: isPostRecordMatchPending } = useMutation({
    mutationFn: (body: PostRecordMatchRequestT) => postRecordMatch(tournamentId, body),
    onSuccess: data => {
      // 매치 기록 후 진행 상태/완료 여부가 바뀌므로 단건 조회 invalidate
      queryClient.invalidateQueries({ queryKey: ['tournament', tournamentId] });
      onSuccess?.(data);
    },
  });

  return { postRecordMatchMutation, isPostRecordMatchPending };
};
