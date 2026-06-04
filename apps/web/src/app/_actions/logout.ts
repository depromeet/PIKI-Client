'use server';

import { cookies } from 'next/headers';

import { serverApi } from '@/apis/server';
import { ENDPOINTS } from '@/consts/api';

const AUTH_COOKIE_NAMES = ['access_token', 'refresh_token'] as const;

export const logout = async () => {
  try {
    await serverApi.post(ENDPOINTS.AUTH_LOGOUT);
  } catch {
    // 백엔드 실패해도 로컬 쿠키는 삭제
  }

  const cookieStore = await cookies();
  AUTH_COOKIE_NAMES.forEach(cookieName => {
    if (cookieStore.has(cookieName)) cookieStore.delete(cookieName);
  });
};
