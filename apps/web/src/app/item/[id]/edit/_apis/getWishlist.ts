import { environmentManager } from '@tanstack/react-query';

import { clientApi } from '@/apis/client';
import { serverApi } from '@/apis/server';
import type { ApiResponseT } from '@/types/api';

import type { GetWishlistResponseT } from '../_types/wish';

export const getWishlist = async () => {
  if (environmentManager.isServer()) {
    const { data } = await serverApi.get<ApiResponseT<GetWishlistResponseT>>('/api/v1/wishlists');
    return data.data;
  }

  const { data } = await clientApi.get<ApiResponseT<GetWishlistResponseT>>('/api/v1/wishlists');
  return data.data;
};
