'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/button';

import { logout } from '../_actions/logout';

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <Button size="lg" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}

export default LogoutButton;
