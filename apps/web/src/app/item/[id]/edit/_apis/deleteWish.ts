import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

export const deleteWish = async (wishId: number) => {
  const { data } = await clientApi.delete<ApiResponseT<null>>(ENDPOINTS.WISHLIST(wishId));

  return data.data;
};
