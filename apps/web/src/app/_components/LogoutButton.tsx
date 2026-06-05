'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/button';
import { ROUTES } from '@/consts/route';

import { logout } from '../_actions/logout';

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace(ROUTES.LOGIN);
  };

  return (
    <Button size="lg" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}

export default LogoutButton;
