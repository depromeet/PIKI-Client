import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { PatchWishRequestT, PatchWishResponseT } from '../_types/wish';

export const patchWish = async (wishId: number, body: PatchWishRequestT) => {
  const { data } = await clientApi.patch<ApiResponseT<PatchWishResponseT>>(
    ENDPOINTS.WISHLIST(wishId),
    body
  );

  return data.data;
};
