import { environmentManager } from '@tanstack/react-query';

import { clientApi } from '@/apis/client';
import { serverApi } from '@/apis/server';
import { API_ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { GetWishResponseT } from '../_types/wish';

export const getWish = async (wishId: number) => {
  if (environmentManager.isServer()) {
    const { data } = await serverApi.get<ApiResponseT<GetWishResponseT>>(
      API_ENDPOINTS.WISHLISTS.DETAIL(wishId)
    );
    return data.data;
  }

  const { data } = await clientApi.get<ApiResponseT<GetWishResponseT>>(
    API_ENDPOINTS.WISHLISTS.DETAIL(wishId)
  );
  return data.data;
};
