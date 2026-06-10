import { ENDPOINTS } from '@/consts/api';
import { setCookie } from '@/utils/cookie';

import { clientApi } from './client';

export const postFcmToken = async (token: string, deviceId: string | null) => {
  await clientApi.post(ENDPOINTS.FCM_TOKENS, { token, deviceId });

  if (deviceId) setCookie('device_id', deviceId);
};
