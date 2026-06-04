import { isAxiosError } from 'axios';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { getMe } from '@/apis/getMe';
import { ROUTES } from '@/consts/route';
import type { ApiErrorResponseT } from '@/types/api';

type ArchiveLayoutProps = {
  children: React.ReactNode;
};

const redirectToLogin = (callback: string) => {
  const searchParams = new URLSearchParams({ callback });
  redirect(`${ROUTES.LOGIN}?${searchParams.toString()}`);
};

async function ArchiveLayout({ children }: ArchiveLayoutProps) {
  const headerStore = await headers();
  const callback = headerStore.get('x-callback') ?? ROUTES.ARCHIVE_BASE;

  /** MEMBER 권한 조회 - 멤버 권한 없으면 로그인 페이지로 리다이렉트 */
  try {
    const user = await getMe();

    if (user.identityType !== 'MEMBER') redirectToLogin(callback);
  } catch (error) {
    if (isAxiosError<ApiErrorResponseT>(error) && error.response?.status === 401)
      redirectToLogin(callback);

    throw error;
  }

  return children;
}

export default ArchiveLayout;
