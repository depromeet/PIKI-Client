import { redirect } from 'next/navigation';

import { getMe } from '@/apis/getMe';
import { ROUTES } from '@/consts/route';

async function LoginLayout({ children }: { children: React.ReactNode }) {
  const user = await getMe().catch(() => null);

  /** 로그인 페이지에 유효한 멤버 접근 시 홈으로 리다이렉트 */
  if (user?.identityType === 'MEMBER') redirect(ROUTES.HOME);

  return children;
}

export default LoginLayout;
