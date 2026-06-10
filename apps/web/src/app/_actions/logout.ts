'use server';

import { cookies } from 'next/headers';

import { deleteFcmToken } from '@/apis/deleteFcmToken';
import { serverApi } from '@/apis/server';
import { ENDPOINTS } from '@/consts/api';

const AUTH_COOKIE_NAMES = ['access_token', 'refresh_token', 'device_id'] as const;

export const logout = async () => {
  const cookieStore = await cookies();
  const deviceId = cookieStore.get('device_id')?.value;

  if (deviceId) {
    try {
      await deleteFcmToken(deviceId);
    } catch {
      // FCM 토큰 해제 실패해도 로그아웃 진행
    }
  }

  try {
    await serverApi.post(ENDPOINTS.AUTH_LOGOUT);
  } catch {
    // 백엔드 실패해도 로컬 쿠키는 삭제
  }

  AUTH_COOKIE_NAMES.forEach(cookieName => {
    if (cookieStore.has(cookieName)) cookieStore.delete(cookieName);
  });
};
