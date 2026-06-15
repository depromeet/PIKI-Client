import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getNicknameCheck } from '@/apis/getNicknameCheck';

const NICKNAME_MAX_LENGTH = 10;
const DEBOUNCE_MS = 300;

/**
 * 닉네임 중복 체크 훅.
 * - 입력값을 debounce 후 조회 (불필요한 호출 최소화)
 * - 빈 값 / 길이 초과 / debounce 진행 중에는 조회 비활성
 */
export const useGetNicknameCheck = (nickname: string) => {
  const [debouncedNickname, setDebouncedNickname] = useState(nickname);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedNickname(nickname), DEBOUNCE_MS);
    return () => window.clearTimeout(timeoutId);
  }, [nickname]);

  const trimmed = debouncedNickname.trim();
  const isValidLength = trimmed.length > 0 && trimmed.length <= NICKNAME_MAX_LENGTH;
  const isPendingDebounce = nickname.trim() !== trimmed;

  const { data: nicknameCheckData, isFetching: isNicknameCheckFetching } = useQuery({
    queryKey: ['nicknameCheck', trimmed],
    queryFn: () => getNicknameCheck(trimmed),
    enabled: isValidLength,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });

  return {
    nicknameCheckData,
    isNicknameCheckFetching: isNicknameCheckFetching || isPendingDebounce,
  };
};
