import { ENDPOINTS } from '@/consts/api';

import { clientApi } from './client';

export const postFcmToken = async (token: string, deviceId: string | null) => {
  await clientApi.post(ENDPOINTS.FCM_TOKENS, { token, deviceId });
};
