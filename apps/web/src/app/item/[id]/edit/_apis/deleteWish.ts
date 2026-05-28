import { clientApi } from '@/apis/client';
import { API_ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

export const deleteWish = async (wishId: number) => {
  const { data } = await clientApi.delete<ApiResponseT<null>>(API_ENDPOINTS.WISHLISTS.DETAIL(wishId));

  return data.data;
};
