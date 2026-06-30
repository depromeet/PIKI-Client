import { WEBBRIDGE_MESSAGE_TYPE } from '@piki/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { QUERY_ACTION } from '@/consts/queryAction';
import { ROUTES } from '@/consts/route';
import { setCookie } from '@/utils/cookie';
import { getRouteType } from '@/utils/getRouteType';
import { getLoginRedirectPath } from '@/utils/loginRedirect';
import { WebBridge, isWebview } from '@/utils/webBridge';

import { postGuestLogin } from '../_apis/postGuestLogin';

export const usePostGuestLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: postGuestLoginMutation, isPending: isPostGuestLoginPending } = useMutation({
    mutationFn: postGuestLogin,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['me'] });

      if (isWebview() && data.accessToken && data.refreshToken) {
        setCookie('access_token', data.accessToken, { minutes: 15 });
        setCookie('refresh_token', data.refreshToken, { days: 14 });
        WebBridge.postMessage({
          type: WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_TOKEN_REFRESHED,
          payload: { accessToken: data.accessToken, refreshToken: data.refreshToken },
        });
      }

      /** 회원 전용 경로로 redirect 하려는 경우 홈으로 보내고 도착 시 안내 토스트 노출 */
      const redirectPath = getLoginRedirectPath();
      const isMemberOnly =
        getRouteType(redirectPath.split('?')[0] ?? redirectPath) === 'MEMBER_ONLY';

      router.replace(
        isMemberOnly
          ? `${ROUTES.HOME}?${QUERY_ACTION.KEY}=${QUERY_ACTION.VALUE.MEMBER_ONLY}`
          : redirectPath
      );
    },
  });

  return { postGuestLoginMutation, isPostGuestLoginPending };
};
