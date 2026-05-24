'use client';

import { useRouter } from 'next/navigation';

import { deleteCookie } from '@/utils/cookie';

function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    router.replace('/login');
  };

  return (
    <button type="button" onClick={handleLogout}>
      로그아웃
    </button>
  );
}

export default LogoutButton;
