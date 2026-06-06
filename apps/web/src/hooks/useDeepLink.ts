'use client';

import { PUSH_NOTIFICATION_TYPE, WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { ROUTES } from '@/consts/route';
import { useWebBridgeMessage } from '@/hooks/useWebBridgeMessage';

export const useDeepLink = () => {
  const router = useRouter();

  useWebBridgeMessage(
    useCallback(
      message => {
        if (message.type !== WEBBRIDGE_MESSAGE_TYPE.APP_REQ_DEEP_LINK) return;

        const { type, refId } = message.payload;

        switch (type) {
          case PUSH_NOTIFICATION_TYPE.TOURNAMENT_JOINED:
          case PUSH_NOTIFICATION_TYPE.TOURNAMENT_ITEM_ADDED:
            router.push(ROUTES.TOURNAMENT_CREATE(refId));
            break;
          case PUSH_NOTIFICATION_TYPE.ITEM_PARSING_COMPLETED:
          case PUSH_NOTIFICATION_TYPE.ITEM_PARSING_FAILED:
            router.push(ROUTES.ARCHIVE());
            break;
        }
      },
      [router]
    )
  );
};
