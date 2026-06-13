'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { getMe } from '@/apis/getMe';
import { ROUTES } from '@/consts/route';
import { useNotificationSSE } from '@/hooks/useNotificationSSE';

const AUTH_EXCLUDED_PATHS = [ROUTES.LOGIN, ROUTES.ROOT] as const;

function NotificationSSEProvider() {
  const pathname = usePathname();
  const isAuthPage = AUTH_EXCLUDED_PATHS.some(path => pathname === path);

  const { data: meData } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !isAuthPage,
    retry: false,
  });

  useNotificationSSE(!!meData);

  return null;
}

export default NotificationSSEProvider;
