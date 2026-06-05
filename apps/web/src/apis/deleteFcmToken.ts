import type { DeleteFcmTokenPayloadT } from '@piki/core';

import { clientApi } from './client';

export const deleteFcmToken = async (body: DeleteFcmTokenPayloadT) => {
  await clientApi.delete('/api/v1/fcm/tokens', { data: body });
};
