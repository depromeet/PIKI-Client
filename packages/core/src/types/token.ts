import type { WEBBRIDGE_MESSAGE_TYPE } from '../consts/webBridge';

/** 웹 → 앱 토큰 저장 요청 */
export type StoreTokenMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.STORE_TOKEN;
  payload: StoreTokenPayloadT;
};
export type StoreTokenPayloadT = {
  accessToken: string;
  refreshToken: string;
};

/** 웹 → 앱 토큰 수신 준비 요청 */
export type WebReadyToReceiveTokenMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.WEB_READY_TO_RECEIVE_TOKEN;
};

/** 앱 → 웹 토큰 동기화 요청 */
export type SetAppTokenMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.SET_APP_TOKEN;
  payload: SetAppTokenPayloadT;
};
export type SetAppTokenPayloadT = {
  accessToken: string;
  refreshToken: string;
};
