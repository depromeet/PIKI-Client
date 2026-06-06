'use client';

import { useNotificationSSE } from '@/hooks/useNotificationSSE';

function NotificationSSEProvider() {
  useNotificationSSE(true);
  return null;
}

export default NotificationSSEProvider;
