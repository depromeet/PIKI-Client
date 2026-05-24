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
  const { mutate: mutateGuestLogin, isPending: isGuestLoginPending } = usePostGuestLogin();
  const { mutate: mutateMemberLogin, isPending: isMemberLoginPending } = usePostMemberLogin();

  const handleButtonClick = () => {
    if (identityType === 'GUEST') mutateGuestLogin();
    else mutateMemberLogin();
  };

  return (
    <Button
      onClick={handleButtonClick}
      disabled={isGuestLoginPending || isMemberLoginPending}
      className="w-32"
    >
      {identityType === 'GUEST' && (isGuestLoginPending ? <Spinner /> : '게스트 로그인')}

      {identityType === 'MEMBER' && (isMemberLoginPending ? <Spinner /> : '회원 로그인')}
    </Button>
  );
}
