import type { ApiResponseT } from '@/types/api';
import type { PatchWishPayloadT, WishlistEntryT } from '@/types/wishlist';

import { clientApi } from './client';

export const patchWish = async (wishId: number, payload: PatchWishPayloadT) => {
  const { data } = await clientApi.patch<ApiResponseT<WishlistEntryT>>(
    `/api/v1/wishlists/${wishId}`,
    payload
  );
  return data.data;
};
