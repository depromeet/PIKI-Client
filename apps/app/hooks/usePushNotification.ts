import messaging from '@react-native-firebase/messaging';
import * as Application from 'expo-application';
import { useEffect } from 'react';

import { postFcmToken } from '@/apis/fcmToken';

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

const usePushNotification = (accessToken: string | null) => {
  useEffect(() => {
    if (!accessToken) return;

    const init = async () => {
      const deviceId = await getDeviceId();
      const enabled = await requestPermission();
      if (!enabled) return;

      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();

      await postFcmToken({ token, deviceId }, accessToken);
    };

    init();

    const unsubscribeTokenRefresh = messaging().onTokenRefresh(async newToken => {
      const deviceId = await getDeviceId();
      await postFcmToken({ token: newToken, deviceId }, accessToken);
    });

    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.warn('Foreground FCM message:', remoteMessage);
    });

    return () => {
      unsubscribeTokenRefresh();
      unsubscribeForeground();
    };
  }, [accessToken]);
};

export default usePushNotification;
