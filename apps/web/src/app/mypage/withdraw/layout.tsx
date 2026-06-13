import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { notFound, redirect } from 'next/navigation';

import { getMe } from '@/apis/getMe';
import { ROUTES } from '@/consts/route';
import type { ApiErrorResponseT } from '@/types/api';
import { getQueryClient } from '@/utils/queryClient';

async function MyPageMemberOnlyLayout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  /** 유저 정보 조회 */
  try {
    const userData = await getMe();
    queryClient.setQueryData(['me'], userData);

    if (userData.identityType !== 'MEMBER') redirect(ROUTES.LOGIN);
  } catch (error) {
    if (!isAxiosError<ApiErrorResponseT>(error)) throw error;

    if (error.response?.status === 404) notFound(); // TODO: 아직 미정
  }

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}

export default MyPageMemberOnlyLayout;
