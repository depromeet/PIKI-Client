import type { WEBBRIDGE_MESSAGE_TYPE } from '../consts/webBridge';

/**
 * 웹 → 앱: GA4/Firebase Analytics 이벤트 로깅 요청.
 * 앱이 받아서 `@react-native-firebase/analytics` 의 `logEvent` 로 전달한다.
 *
 * params 는 GA4 정책에 따라 primitive (string | number | boolean) 만 허용된다.
 * 키는 snake_case, 40자 이내, PII(이메일/닉네임 등) 금지.
 */
export type AnalyticsEventParamT = string | number | boolean;
export type AnalyticsEventParamsT = Record<string, AnalyticsEventParamT>;

export type LogAnalyticsEventPayloadT = {
  name: string;
  params?: AnalyticsEventParamsT;
};

export type WebReqLogAnalyticsEventMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_LOG_ANALYTICS_EVENT;
  payload: LogAnalyticsEventPayloadT;
};
