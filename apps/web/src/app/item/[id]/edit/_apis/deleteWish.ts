import { clientApi } from '@/apis/client';
import type { ApiResponseT } from '@/types/api';

export const deleteWish = async (wishId: number) => {
  const { data } = await clientApi.delete<ApiResponseT<null>>(`/api/v1/wishlists/${wishId}`);

  return data.data;
};
