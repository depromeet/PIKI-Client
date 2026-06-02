'use client';

import Button from '@/components/common/button';
import Spinner from '@/components/common/spinner';
import type { UserIdentityTypeT } from '@/types/user';

import { usePostGuestLogin } from '../_hooks/usePostGuestLogin';
import { usePostMemberLogin } from '../_hooks/usePostMemberLogin';

type Props = {
  identityType: UserIdentityTypeT;
};

// TEMP
export default function LoginButton({ identityType }: Props) {
  const { postGuestLoginMutation, isPostGuestLoginPending } = usePostGuestLogin();
  const { postMemberLoginMutation, isPostMemberLoginPending } = usePostMemberLogin();

  const handleButtonClick = () => {
    if (identityType === 'GUEST') postGuestLoginMutation();
    else postMemberLoginMutation();
  };

  return (
    <Button
      onClick={handleButtonClick}
      disabled={isPostGuestLoginPending || isPostMemberLoginPending}
      className="w-32"
    >
      {identityType === 'GUEST' && (isPostGuestLoginPending ? <Spinner /> : '게스트 로그인')}

      {identityType === 'MEMBER' && (isPostMemberLoginPending ? <Spinner /> : '회원 로그인')}
    </Button>
  );
}
