'use client';

import { WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';
import { useCallback } from 'react';

import { deleteFcmToken } from '@/apis/deleteFcmToken';
import { postFcmToken } from '@/apis/postFcmToken';

import { useWebBridgeMessage } from './useWebBridgeMessage';

export const FCM_DEVICE_ID_KEY = 'fcm_device_id';

export function useFcmTokenBridge() {
  useWebBridgeMessage(
    useCallback(async message => {
      if (message.type === WEBBRIDGE_MESSAGE_TYPE.REGISTER_FCM_TOKEN) {
        sessionStorage.setItem(FCM_DEVICE_ID_KEY, message.payload.deviceId);
        await postFcmToken(message.payload);
      }

      if (message.type === WEBBRIDGE_MESSAGE_TYPE.DELETE_FCM_TOKEN) {
        await deleteFcmToken(message.payload);
      }
    }, [])
  );
}
