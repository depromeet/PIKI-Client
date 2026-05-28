import { environmentManager } from '@tanstack/react-query';

import { clientApi } from '@/apis/client';
import { serverApi } from '@/apis/server';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';

import type { WishlistEntryT } from '../_types/wishTypes';

const mapWishlist = (entries: WishlistEntryT[]) =>
  entries.map(({ wish, item }) => ({
    id: wish.id,
    name: item.name,
    price: item.currentPrice,
    imageUrl: item.imageUrl || void 0,
  }));

export const getWishlist = async () => {
  if (environmentManager.isServer()) {
    const { data } = await serverApi.get<ApiResponseT<WishlistEntryT[]>>(ENDPOINTS.WISHLISTS);
    return mapWishlist(data.data);
  }

  const { data } = await clientApi.get<ApiResponseT<WishlistEntryT[]>>(ENDPOINTS.WISHLISTS);
  return mapWishlist(data.data);
};
