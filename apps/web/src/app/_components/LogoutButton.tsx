'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/button';
import { deleteCookie } from '@/utils/cookie';

function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    router.refresh();
  };

  return (
    <Button size="lg" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}

export default LogoutButton;
