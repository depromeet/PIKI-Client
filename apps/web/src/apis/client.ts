import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import { CLIENT_TYPE } from '@/consts/webBridge';
import type { ApiErrorResponseT } from '@/types/api';
import { getCookie, setCookie } from '@/utils/cookie';
import { isWebview } from '@/utils/webBridge';

// 재시도 여부 플래그를 포함한 요청 타입
type RetryableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

// refresh 진행 중 여부
let isRefreshing = false;
// refresh 완료를 기다리는 요청 큐
let failedQueue: Array<{
  resolve: () => void;
  reject: (reason?: unknown) => void;
}> = [];

// 큐에 쌓인 요청들을 일괄 처리
const processQueue = (error: unknown) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
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
    const originalRequest = error.config as RetryableRequest | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // refresh 진행 중이면 큐에 대기
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => clientApi(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post('/api/v1/auth/token/refresh', null, {
          withCredentials: true,
        });
        // 웹뷰 환경은 Bearer 토큰 방식이므로 refresh 후 새 토큰을 쿠키에 저장
        if (isWebview() && data?.data?.accessToken) {
          setCookie('access_token', data.data.accessToken);
        }
        processQueue(null);
        return clientApi(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        if (typeof window !== 'undefined') {
          // window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
