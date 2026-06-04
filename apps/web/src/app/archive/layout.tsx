import { isAxiosError } from 'axios';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { getMe } from '@/apis/getMe';
import type { ApiErrorResponseT } from '@/types/api';
import { getLoginPath } from '@/utils/loginRedirect';

type ArchiveLayoutProps = {
  children: React.ReactNode;
};

async function ArchiveLayout({ children }: ArchiveLayoutProps) {
  const headerStore = await headers();
  const redirectPath = headerStore.get('x-redirect-path');

  /** MEMBER 권한 조회 - 멤버 권한 없으면 로그인 페이지로 리다이렉트 */
  try {
    const user = await getMe();

    if (user.identityType !== 'MEMBER') redirect(getLoginPath(redirectPath));
  } catch (error) {
    if (isAxiosError<ApiErrorResponseT>(error) && error.response?.status === 401)
      redirect(getLoginPath(redirectPath));

    throw error;
  }

  return children;
}

export default ArchiveLayout;
