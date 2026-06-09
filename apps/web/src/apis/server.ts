import axios from 'axios';

import { CLIENT_TYPE } from '@/consts/webBridge';
import { isWebview } from '@/utils/webBridge';

// 서버 컴포넌트 전용 인스턴스
export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

serverApi.interceptors.request.use(async config => {
  const { cookies, headers } = await import('next/headers');
  const cookieStore = await cookies();
  config.headers.Cookie = cookieStore.toString();

  const headerStore = await headers();
  const userAgent = headerStore.get('user-agent');
  config.headers['X-Client-Type'] = isWebview(userAgent) ? CLIENT_TYPE.APP : CLIENT_TYPE.WEB;

  return config;
});
