import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

const requestPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
};

const usePushNotification = () => {
  useEffect(() => {
    const init = async () => {
      const enabled = await requestPermission();
      if (!enabled) return;

      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();
      // TODO: 서버에 POST /api/v1/fcm/tokens { token: fcmToken } 호출
      console.warn('FCM Token:', fcmToken);
    };

    init();

    // 토큰 갱신 시 재등록
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(newToken => {
      // TODO: 서버에 POST /api/v1/fcm/tokens { token: newToken } 호출
      console.warn('FCM Token 갱신:', newToken);
    });

    // Foreground 메시지 수신
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.warn('Foreground FCM message:', remoteMessage);
    });

    return () => {
      unsubscribeTokenRefresh();
      unsubscribeForeground();
    };
  }, []);
};

export default usePushNotification;
