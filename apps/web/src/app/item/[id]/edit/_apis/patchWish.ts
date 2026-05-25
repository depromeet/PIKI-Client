import { clientApi } from '@/apis/client';
import type { ApiResponseT } from '@/types/api';

import type { PatchWishRequestT, PatchWishResponseT } from '../_types/wish';

export const patchWish = async (wishId: number, body: PatchWishRequestT) => {
  const { data } = await clientApi.patch<ApiResponseT<PatchWishResponseT>>(
    `/api/v1/wishlists/${wishId}`,
    body
  );

  return data.data;
};
