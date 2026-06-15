'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { getMe } from '@/apis/getMe';
import { ROUTES } from '@/consts/route';
import { useNotificationSSE } from '@/hooks/useNotificationSSE';

function NotificationSSEProvider() {
  const pathname = usePathname();
  const disabled =
    pathname === ROUTES.LOGIN ||
    pathname === ROUTES.ROOT ||
    /^\/auth\/callback\/[^/]+$/.test(pathname);

  const { data: meData } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !disabled,
    retry: false,
  });

  useNotificationSSE(!!meData);

  return null;
}

export default NotificationSSEProvider;
