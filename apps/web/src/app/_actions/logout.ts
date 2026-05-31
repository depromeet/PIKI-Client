'use server';

import { cookies } from 'next/headers';

const AUTH_COOKIE_NAMES = ['access_token', 'refresh_token'] as const;

// TEMP
export const logout = async () => {
  const cookieStore = await cookies();

  AUTH_COOKIE_NAMES.forEach(cookieName => {
    if (cookieStore.has(cookieName)) cookieStore.delete(cookieName);
  });
};
