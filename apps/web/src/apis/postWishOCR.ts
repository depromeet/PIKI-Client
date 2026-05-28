import type { ApiResponseT } from '@/types/api';
import type { PostWishOCRResponseT } from '@/types/wish';

import { clientApi } from './client';

export const postWishOCR = async (formData: FormData) => {
  const { data } = await clientApi.post<ApiResponseT<PostWishOCRResponseT>>(
    '/api/v1/wishlists/images',
    formData
  );

  return data.data;
};
