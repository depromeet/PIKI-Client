import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';
import type { PostWishLinkResponseT } from '@/types/wish';

import { clientApi } from './client';

export const postWishLink = async (url: string) => {
  const { data } = await clientApi.post<ApiResponseT<PostWishLinkResponseT>>(ENDPOINTS.WISHLISTS, {
    url,
  });

  return data.data;
};
