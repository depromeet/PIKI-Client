import { useEffect } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

import {
  initializePushNotification,
  setupMessagingListeners,
  syncPushStatusToWeb,
} from '@/utils/pushNotification';

/** 앱 시작 시 FCM 권한 요청·토큰 로그 및 메시지 리스너 등록 */
function PushNotificationProvider() {
  useEffect(() => {
    void initializePushNotification();

    const unsubscribeMessaging = setupMessagingListeners();

    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState !== 'active') return;

      void syncPushStatusToWeb();
    };

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      unsubscribeMessaging();
      appStateSubscription.remove();
    };
  }, []);

  return null;
}

export default PushNotificationProvider;
