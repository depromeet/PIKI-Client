import type { ApiResponseT } from '@/types/api';
import type { WishlistEntryT } from '@/types/wishlist';

import { clientApi } from './client';

export const getWishlist = async () => {
  const { data } = await clientApi.get<ApiResponseT<WishlistEntryT[]>>('/api/v1/wishlists');
  return data.data.map(({ wish, item }) => ({
    id: wish.id,
    name: item.name,
    price: item.currentPrice,
    imageUrl: item.imageUrl || void 0,
  }));
};
