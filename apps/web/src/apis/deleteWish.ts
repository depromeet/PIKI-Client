import { clientApi } from './client';

export const deleteWish = async (wishId: number) => {
  await clientApi.delete(`/api/v1/wishlists/${wishId}`);
};
