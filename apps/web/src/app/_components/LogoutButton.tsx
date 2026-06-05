'use client';

import { WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/button';
import { FCM_DEVICE_ID_KEY } from '@/hooks/useFcmTokenBridge';
import { WebBridge } from '@/utils/webBridge';

import { logout } from '../_actions/logout';

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const deviceId = sessionStorage.getItem(FCM_DEVICE_ID_KEY);
    if (deviceId) {
      WebBridge.postMessage(WEBBRIDGE_MESSAGE_TYPE.DELETE_FCM_TOKEN, { deviceId });
    }

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
