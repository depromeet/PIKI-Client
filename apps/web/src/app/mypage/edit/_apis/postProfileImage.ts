import { clientApi } from '@/apis/client';
import { ENDPOINTS } from '@/consts/api';
import type { ApiResponseT } from '@/types/api';
import type { UserT } from '@/types/user';

export const postProfileImage = async (formData: FormData) => {
  const { data } = await clientApi.post<ApiResponseT<UserT>>(
    ENDPOINTS.USER_PROFILE_IMAGE,
    formData
  );

  return data.data;
};
