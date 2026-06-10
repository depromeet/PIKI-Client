import { isAxiosError } from 'axios';

import { useDebounce } from '@/hooks/useDebounce';
import type { ApiErrorResponseT } from '@/types/api';

import { useGetNicknameCheck } from './useGetNicknameCheck';

const NICKNAME_DEBOUNCE_DELAY = 300;
const WITHDRAW_PREFIX = '탈퇴';
const WITHDRAW_PREFIX_ERROR_TEXT = `'탈퇴'로 시작하는 닉네임은 사용할 수 없습니다.`;

export const useNicknameValidation = (nickname: string, originalNickname: string) => {
  const trimmedNickname = nickname.trim();
  const debouncedNickname = useDebounce(trimmedNickname, NICKNAME_DEBOUNCE_DELAY);

  const isNicknameChanged = trimmedNickname !== originalNickname;
  const hasNickname = trimmedNickname.length > 0;
  const hasInvalidPrefix = trimmedNickname.startsWith(WITHDRAW_PREFIX);
  const isDebouncing = debouncedNickname !== trimmedNickname;
  const canCheckNickname =
    isNicknameChanged &&
    hasNickname &&
    !hasInvalidPrefix &&
    debouncedNickname.length > 0 &&
    debouncedNickname === trimmedNickname;

  const {
    getNicknameCheckError,
    isGetNicknameCheckFetching,
    isGetNicknameCheckSuccess,
    nicknameCheckData,
  } = useGetNicknameCheck(debouncedNickname, canCheckNickname);

  let nicknameErrorText: string | null = null;

  if (hasInvalidPrefix) nicknameErrorText = WITHDRAW_PREFIX_ERROR_TEXT;
  else if (
    canCheckNickname &&
    isAxiosError<ApiErrorResponseT>(getNicknameCheckError) &&
    getNicknameCheckError.response
  )
    nicknameErrorText = getNicknameCheckError.response.data.detail;
  else if (canCheckNickname && nicknameCheckData && !nicknameCheckData.available)
    nicknameErrorText = nicknameCheckData.detail;

  const isCheckingNickname =
    isNicknameChanged &&
    hasNickname &&
    !hasInvalidPrefix &&
    (isDebouncing || isGetNicknameCheckFetching);
  const isNicknameAvailable = nicknameCheckData?.available === true;

  const isNicknameValid =
    hasNickname &&
    (!isNicknameChanged ||
      (canCheckNickname &&
        isGetNicknameCheckSuccess &&
        !isGetNicknameCheckFetching &&
        isNicknameAvailable));

  return {
    isCheckingNickname,
    isNicknameChanged,
    isNicknameValid,
    nicknameErrorText,
    trimmedNickname,
  };
};
