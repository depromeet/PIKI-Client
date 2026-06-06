'use client';

import { WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useWebBridgeMessage } from '@/hooks/useWebBridgeMessage';
import { getPushNotificationRoute } from '@/utils/pushNotificationRoute';

export const useDeepLink = () => {
  const router = useRouter();

  useWebBridgeMessage(
    useCallback(
      message => {
        if (message.type !== WEBBRIDGE_MESSAGE_TYPE.APP_REQ_DEEP_LINK) return;

        const { type, refId } = message.payload;
        const route = getPushNotificationRoute(type, refId);

        if (route) router.push(route);
      },
      [router]
    )
  );
};
