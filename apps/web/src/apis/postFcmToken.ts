import type { RegisterFcmTokenPayloadT } from '@piki/core';

import { clientApi } from './client';

export const postFcmToken = async (body: RegisterFcmTokenPayloadT) => {
  await clientApi.post('/api/v1/fcm/tokens', body);
};
