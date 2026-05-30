import { useMutation } from '@tanstack/react-query';

import { postRecordMatch } from '../_apis/postRecordMatch';
import type {
  PostRecordMatchRequestT,
  PostRecordMatchResponseT,
} from '../_common/_types/tournamentResponse';

type UsePostRecordMatchArgs = {
  tournamentId: number;
  onSuccess?: (data: PostRecordMatchResponseT) => void;
};

export const usePostRecordMatch = ({ tournamentId, onSuccess }: UsePostRecordMatchArgs) => {
  const { mutate: postRecordMatchMutation, isPending: isPostRecordMatchPending } = useMutation({
    mutationFn: (body: PostRecordMatchRequestT) => postRecordMatch(tournamentId, body),
    onSuccess,
  });

  return { postRecordMatchMutation, isPostRecordMatchPending };
};
