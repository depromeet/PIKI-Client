import { ENDPOINTS } from '@/consts/api';

import { serverApi } from './server';

export const deleteFcmToken = async (deviceId: string) => {
  await serverApi.delete(ENDPOINTS.FCM_TOKENS, { data: { deviceId } });
};
