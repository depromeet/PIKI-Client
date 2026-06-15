'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { getMe } from '@/apis/getMe';
import { useNotificationSSE } from '@/hooks/useNotificationSSE';
import { getRouteType } from '@/utils/getRouteType';

function NotificationSSEProvider() {
  const pathname = usePathname();
  const isPublicRoute = getRouteType(pathname);

  const { data: meData } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !isPublicRoute,
    retry: false,
  });

  useNotificationSSE(!!meData);

  return null;
}

export default NotificationSSEProvider;
