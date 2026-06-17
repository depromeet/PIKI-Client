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
        /** 토큰 갱신 — body 없는 POST 라도 빈 객체로 보내야 일부 백엔드가 415 안 던진다. */
        const { data } = await axios.post(
          ENDPOINTS.AUTH_TOKEN_REFRESH,
          {},
          {
            withCredentials: true,
            headers: {
              'X-Client-Type': isWebview() ? CLIENT_TYPE.APP : CLIENT_TYPE.WEB,
            },
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
