import type { WEBBRIDGE_MESSAGE_TYPE } from '../consts/webBridge';

export type SocialProviderT = 'kakao' | 'google';

/** 웹 → 앱 소셜 로그인 요청 */
export type RequestSocialLoginMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.REQUEST_SOCIAL_LOGIN;
  payload: RequestSocialLoginPayloadT;
};
export type RequestSocialLoginPayloadT = {
  provider: SocialProviderT;
};

/** 앱 → 웹 소셜 로그인 성공 */
export type SocialLoginSuccessMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.SOCIAL_LOGIN_SUCCESS;
  payload: SocialLoginSuccessPayloadT;
};
export type SocialLoginSuccessPayloadT = {
  accessToken: string;
  refreshToken: string;
};

/** 앱 → 웹 소셜 로그인 실패 */
export type SocialLoginErrorMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.SOCIAL_LOGIN_ERROR;
  payload: SocialLoginErrorPayloadT;
};
export type SocialLoginErrorPayloadT = {
  detail: string;
};
