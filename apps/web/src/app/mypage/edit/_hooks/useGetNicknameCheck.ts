import { useQuery } from '@tanstack/react-query';

import { getNicknameCheck } from '../_apis/getNicknameCheck';

export const useGetNicknameCheck = (nickname: string, enabled: boolean) => {
  const {
    data: nicknameCheckData,
    error: nicknameCheckError,
    isFetching: isGetNicknameCheckFetching,
    isSuccess: isGetNicknameCheckSuccess,
  } = useQuery({
    queryKey: ['nickname', nickname],
    queryFn: () => getNicknameCheck(nickname),
    enabled,
    retry: false,
  });

  return {
    getNicknameCheckError: nicknameCheckError,
    isGetNicknameCheckFetching,
    isGetNicknameCheckSuccess,
    nicknameCheckData,
  };
};
