import type { AnalyticsEventParamsT } from '@piki/core';
import analytics from '@react-native-firebase/analytics';

/**
 * GA4 / Firebase Analytics 이벤트 로깅 헬퍼.
 *
 * - 웹뷰에서 브릿지로 들어온 이벤트는 같은 함수로 통합 처리.
 * - 실패해도 사용자 동작에는 영향이 가면 안 되므로 catch 만 하고 console.warn 만 남긴다.
 *
 * GA4 정책:
 *  - 이벤트명: 40자 이내 snake_case
 *  - 파라미터: primitive(string/number/boolean) 만 허용
 *  - PII(이메일/닉네임/실명) 금지 — ID 만 보낸다
 */
export const logAnalyticsEvent = async (name: string, params?: AnalyticsEventParamsT) => {
  try {
    await analytics().logEvent(name, params);
  } catch (error) {
    console.warn('[analytics] logEvent 실패', { name, error });
  }
};

/** 앱 진입 시 한 번 호출 — Firebase 가 활성 사용자 / 세션을 집계할 때 사용한다. */
export const logAppOpenEvent = async () => {
  // v22+ 에서 logAppOpen() namespaced API 가 deprecated 되어 modular logEvent 로 호출.
  // GA4 권장 reserved event 명 'app_open' 을 그대로 쓰면 Firebase 가 동일하게 집계.
  await logAnalyticsEvent('app_open');
};
