'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/button';

function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    router.refresh();
  };

  return (
    <Button size="lg" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}

export default LogoutButton;
