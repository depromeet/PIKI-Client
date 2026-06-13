'use client';

import { WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';
import { useCallback, useEffect, useState } from 'react';

import { useWebBridgeMessage } from '@/hooks/useWebBridgeMessage';
import { WebBridge, isWebview as isWebviewFn } from '@/utils/webBridge';

/** 앱 WebView 알림 권한 상태 및 FCM 토큰 연동 */
export const usePushPermission = () => {
  /** null: 앱 응답 전, true/false: 권한 허용/거부 */
  const [isPushEnabled, setIsPushEnabled] = useState<boolean | null>(null);

  const isWebview = isWebviewFn();

  useWebBridgeMessage(
    useCallback(message => {
      if (message.type === WEBBRIDGE_MESSAGE_TYPE.APP_RES_PUSH_PERMISSION_STATUS)
        setIsPushEnabled(message.payload.isEnabled);
    }, [])
  );

  useEffect(() => {
    if (!isWebview) return;

    WebBridge.postMessage({ type: WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_PUSH_PERMISSION_STATUS });
  }, [isWebview]);

  /** 푸시 알림 권한 요청 */
  const handlePushPermissionRequest = () => {
    WebBridge.postMessage({ type: WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_PUSH_PERMISSION });
  };

  /** 알림 설정 열기 */
  const openNotificationSettings = () => {
    WebBridge.postMessage({ type: WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_OPEN_NOTIFICATION_SETTINGS });
  };

  return {
    isPushEnabled,
    openNotificationSettings,
    handlePushPermissionRequest,
  };
};
