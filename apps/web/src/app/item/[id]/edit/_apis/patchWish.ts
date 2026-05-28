import { clientApi } from '@/apis/client';
import { API_ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { PatchWishRequestT, PatchWishResponseT } from '../_types/wish';

export const patchWish = async (wishId: number, body: PatchWishRequestT) => {
  const { data } = await clientApi.patch<ApiResponseT<PatchWishResponseT>>(
    API_ENDPOINTS.WISHLISTS.DETAIL(wishId),
    body
  );

  return data.data;
};
