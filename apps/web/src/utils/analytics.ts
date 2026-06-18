import type { AnalyticsEventParamsT } from '@piki/core';
import { WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';

import type { AnalyticsEventNameT } from '@/consts/analytics';

import { WebBridge } from './webBridge';

/**
 * GA4 / Firebase Analytics 이벤트 로깅.
 *
 * - 웹뷰(앱) 안: webBridge 로 네이티브에 전달 → `@react-native-firebase/analytics` 가 처리.
 * - 일반 브라우저: 현재는 no-op. 추후 web stream 도입 시 `gtag('event', ...)` 호출 위치.
 *
 * GA4 정책:
 *  - 이벤트명: 40자 이내 snake_case
 *  - 파라미터: primitive(string/number/boolean) 만 허용
 *  - PII(이메일/닉네임/실명) 금지 — ID 만 보낸다
 *
 * 사용:
 * ```
 * logAnalyticsEvent(ANALYTICS_EVENT.TOURNAMENT_CREATE, { tournament_id: id });
 * ```
 */
export const logAnalyticsEvent = (
  name: AnalyticsEventNameT,
  params?: AnalyticsEventParamsT
) => {
  WebBridge.postMessage({
    type: WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_LOG_ANALYTICS_EVENT,
    payload: { name, params },
  });
};
