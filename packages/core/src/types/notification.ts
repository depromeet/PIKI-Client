import type { WEBBRIDGE_MESSAGE_TYPE } from '../consts/webBridge';

/** 웹 → 앱 알림 설정 오픈 요청 */
export type OpenNotificationSettingsMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.OPEN_NOTIFICATION_SETTINGS;
};

/** 앱 → 웹 FCM 토큰 등록 요청 */
export type RegisterFcmTokenMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.REGISTER_FCM_TOKEN;
  payload: RegisterFcmTokenPayloadT;
};
export type RegisterFcmTokenPayloadT = {
  token: string;
  deviceId: string;
};

/** 앱 → 웹 FCM 토큰 삭제 요청 (로그아웃 시) */
export type DeleteFcmTokenMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.DELETE_FCM_TOKEN;
  payload: DeleteFcmTokenPayloadT;
};
export type DeleteFcmTokenPayloadT = {
  deviceId: string;
};
