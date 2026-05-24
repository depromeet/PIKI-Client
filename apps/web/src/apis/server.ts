import axios from 'axios';

// 서버 컴포넌트 전용 인스턴스 (next/headers 사용)
export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 요청 시 쿠키를 헤더에 직접 주입
serverApi.interceptors.request.use(async config => {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  config.headers.Cookie = cookieStore.toString();

  /** TEMP: 삭제 예정. 추후 httponly cookie로 처리 예정 */
  const accessToken = cookieStore.get('accessToken')?.value;
  if (accessToken) config.headers.set('Authorization', `Bearer ${accessToken}`);

  return config;
});
