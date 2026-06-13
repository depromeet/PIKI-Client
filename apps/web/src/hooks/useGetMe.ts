import { useSuspenseQuery } from '@tanstack/react-query';

import { getMe } from '@/apis/getMe';

export const useGetMe = () => {
  const { data: userData } = useSuspenseQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  return { userData };
};
