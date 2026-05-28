import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';

export const deleteWish = async (wishId: number) => {
  await clientApi.delete(ENDPOINTS.WISHLIST(wishId));
};
