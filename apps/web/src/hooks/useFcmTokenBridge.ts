'use client';

import { WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';
import { useCallback } from 'react';

import { deleteFcmToken } from '@/apis/deleteFcmToken';
import { postFcmToken } from '@/apis/postFcmToken';

import { useWebBridgeMessage } from './useWebBridgeMessage';

export function useFcmTokenBridge() {
  useWebBridgeMessage(
    useCallback(async message => {
      if (message.type === WEBBRIDGE_MESSAGE_TYPE.REGISTER_FCM_TOKEN) {
        await postFcmToken(message.payload);
      }

      if (message.type === WEBBRIDGE_MESSAGE_TYPE.DELETE_FCM_TOKEN) {
        await deleteFcmToken(message.payload);
      }
    }, [])
  );
}
