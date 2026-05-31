import { useMutation } from '@tanstack/react-query';

import type {
  PostRecordMatchRequestT,
  PostRecordMatchResponseT,
} from '../../_common/_types/tournamentResponse';
import { postRecordMatch } from '../_apis/postRecordMatch';

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
