'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { getMe } from '@/apis/getMe';
import { useNotificationSSE } from '@/hooks/useNotificationSSE';
import { getRouteType } from '@/utils/getRouteType';

function NotificationSSEProvider() {
  const pathname = usePathname();
  const routeType = getRouteType(pathname);
  const enabled = !!routeType && routeType !== 'PUBLIC';

  const { data: meData } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled,
    retry: false,
  });

  useNotificationSSE(!!meData);

  return null;
}

export default NotificationSSEProvider;
