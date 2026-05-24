import axios from 'axios';
import { cookies } from 'next/headers';

// 서버 컴포넌트 전용 인스턴스 (next/headers 사용)
export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 요청 시 쿠키를 헤더에 직접 주입
serverApi.interceptors.request.use(async config => {
  const cookieStore = await cookies();
  config.headers.Cookie = cookieStore.toString();
  return config;
});

// 응답 언래핑: { status, data, detail, code } → data
serverApi.interceptors.response.use(response => response.data.data);
