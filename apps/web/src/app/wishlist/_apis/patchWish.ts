import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { PatchWishPayloadT, WishlistEntryT } from '../_types/wishTypes';

export const patchWish = async (wishId: number, payload: PatchWishPayloadT) => {
  const { data } = await clientApi.patch<ApiResponseT<WishlistEntryT>>(
    ENDPOINTS.WISHLIST(wishId),
    payload
  );
  return data.data;
};
