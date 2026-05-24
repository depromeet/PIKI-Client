import { environmentManager } from '@tanstack/react-query';

import type { ApiResponseT } from '@/types/api';
import type { UserT } from '@/types/user';

import { clientApi } from './client';
import { serverApi } from './server';

export const getMe = async () => {
  if (environmentManager.isServer()) {
    const { data } = await serverApi.get<ApiResponseT<UserT>>('/api/v1/users/me');

    return data.data;
  }

  const { data } = await clientApi.get<ApiResponseT<UserT>>('/api/v1/users/me');
  return data.data;
};
