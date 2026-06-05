import messaging from '@react-native-firebase/messaging';
import { WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';
import * as Application from 'expo-application';
import { useCallback, useEffect, useRef } from 'react';

import { WebBridge } from '@/utils/webBridge';

const getDeviceId = async () => {
  const idfv = await Application.getIosIdForVendorAsync();
  return idfv ?? 'unknown';
};

const requestPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
};

const getFcmToken = async () => {
  const enabled = await requestPermission();
  if (!enabled) return null;

  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  const deviceId = await getDeviceId();

  console.warn('[FCM] token:', token);
  console.warn('[FCM] deviceId:', deviceId);

  return { token, deviceId };
};

const usePushNotification = () => {
  // 웹뷰 로드 전에 토큰이 준비됐을 때 대기시키기 위한 ref
  const pendingTokenRef = useRef<{ token: string; deviceId: string } | null>(null);
  const isWebviewReadyRef = useRef(false);

  const sendToken = useCallback((token: string, deviceId: string) => {
    if (!isWebviewReadyRef.current) {
      pendingTokenRef.current = { token, deviceId };
      return;
    }
    WebBridge.postMessage(WEBBRIDGE_MESSAGE_TYPE.REGISTER_FCM_TOKEN, { token, deviceId });
  }, []);

  // 웹뷰 로드 완료 시 호출 — index.tsx의 onLoadEnd에서 연결
  const onWebviewReady = useCallback(() => {
    isWebviewReadyRef.current = true;
    if (pendingTokenRef.current) {
      WebBridge.postMessage(
        WEBBRIDGE_MESSAGE_TYPE.REGISTER_FCM_TOKEN,
        pendingTokenRef.current
      );
      pendingTokenRef.current = null;
    }
  }, []);

  useEffect(() => {
    getFcmToken().then(result => {
      if (!result) return;
      sendToken(result.token, result.deviceId);
    });

    const unsubscribeTokenRefresh = messaging().onTokenRefresh(async newToken => {
      const deviceId = await getDeviceId();
      sendToken(newToken, deviceId);
    });

    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.warn('Foreground FCM message:', remoteMessage);
    });

    return () => {
      unsubscribeTokenRefresh();
      unsubscribeForeground();
    };
  }, [sendToken]);

  return { onWebviewReady };
};

export default usePushNotification;
