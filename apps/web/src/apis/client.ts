import type { AxiosError } from 'axios';
import axios from 'axios';

import { ENDPOINTS } from '@/consts/api';
import { CLIENT_TYPE } from '@/consts/webBridge';
import type { ApiErrorResponseT } from '@/types/api';
import { getCookie, setCookie } from '@/utils/cookie';
import { getLoginPath } from '@/utils/loginRedirect';
import { isWebview } from '@/utils/webBridge';

/** refresh 진행 중 여부 */
let isRefreshing = false;

/** refresh 완료를 기다리는 요청 큐 */
let failedQueue: Array<{
  resolve: () => void;
  reject: (reason?: unknown) => void;
}> = [];

/** 큐에 쌓인 요청들을 일괄 처리 */
const processQueue = (error: unknown) => {
  failedQueue.forEach(pendingRequest => {
    if (error) pendingRequest.reject(error);
    else pendingRequest.resolve();
  });
  failedQueue = [];
};

export const clientApi = axios.create({
  withCredentials: true,
});

clientApi.interceptors.request.use(config => {
  const accessToken = getCookie('access_token');
  const isApp = isWebview();

  if (isApp && accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  config.headers['X-Client-Type'] = isApp ? CLIENT_TYPE.APP : CLIENT_TYPE.WEB;

  return config;
});

clientApi.interceptors.response.use(
  response => response,
  async (error: AxiosError<ApiErrorResponseT>) => {
    const originalRequest = error.config;
    const hasRetried = originalRequest?.headers.get('x-retry-attempted') === 'true';

    if (error.response?.status === 401 && originalRequest && !hasRetried) {
      /** refresh 진행 중이면 큐에 대기 */
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => clientApi(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest.headers.set('x-retry-attempted', 'true');
      isRefreshing = true;

      try {
        /**
         * 토큰 갱신 — body 와 Content-Type 을 모두 제거해야 한다.
         * 빈 객체 {} + Content-Type:json 으로 보내면 백엔드가 "body 우선" 으로 검증해
         * refreshToken 필드 누락 → 400 거부. 헤더 자체를 빼면 쿠키만 보고 처리한다.
         */
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${ENDPOINTS.AUTH_TOKEN_REFRESH}`,
          void 0,
          {
            withCredentials: true,
            // Content-Type 헤더가 있으면 백엔드가 body 우선 검증해 400 거부.
            // serverApi 의 postTokenRefreshServer 와 동일하게 false 로 헤더 자체를 제거.
            headers: { 'Content-Type': false as unknown as string },
          }
        );
        /** 웹뷰인 경우 토큰 쿠키에 저장 */
        const { access_token: newAccessToken, refresh_token: newRefreshToken } = data.data;
        if (isWebview() && newAccessToken && newRefreshToken) {
          setCookie('access_token', newAccessToken, { hours: 1 });
          setCookie('refresh_token', newRefreshToken, { days: 14 });
        }

        /** 큐에 대기한 요청들을 일괄 처리 */
        processQueue(null);
        return clientApi(originalRequest);

        /** refresh 요청 실패 시 로그인 페이지로 리다이렉트 */
      } catch (refreshError) {
        processQueue(refreshError);
        if (typeof window !== 'undefined')
          window.location.href = getLoginPath(
            `${window.location.pathname}${window.location.search}`
          );

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
