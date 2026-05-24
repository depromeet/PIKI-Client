import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import type { ApiErrorResponseT } from '@/types/api';

// 재시도 여부 플래그를 포함한 요청 타입
type RetryableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

// refresh 진행 중 여부
let isRefreshing = false;
// refresh 완료를 기다리는 요청 큐
let failedQueue: Array<{
  resolve: (value: undefined) => void;
  reject: (reason?: unknown) => void;
}> = [];

// 큐에 쌓인 요청들을 일괄 처리
const processQueue = (error: unknown) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(undefined);
    }
  });
  failedQueue = [];
};

export const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

clientApi.interceptors.response.use(
  // 응답 언래핑: { status, data, detail, code } → data
  response => response.data.data,
  async (error: AxiosError<ApiErrorResponseT>) => {
    const originalRequest = error.config as RetryableRequest | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // refresh 진행 중이면 큐에 대기
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => clientApi(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, null, {
          withCredentials: true,
        });
        processQueue(null);
        return clientApi(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
