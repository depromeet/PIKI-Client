import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import type { UserT } from '@/types/user';

import { patchNickname } from '../_apis/patchNickname';
import { postProfileImage } from '../_apis/postProfileImage';

export const usePatchMe = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: patchMeMutation, isPending: isPatchMePending } = useMutation({
    // 1. 비동기 처리를 하나로 묶음
    mutationFn: async ({ profileImage, nickname }: { profileImage?: File; nickname?: string }) => {
      const promises: { key: 'image' | 'nickname'; promise: Promise<UserT> }[] = [];

      if (profileImage) {
        const formData = new FormData();
        formData.append('image', profileImage);
        promises.push({ key: 'image', promise: postProfileImage(formData) });
      }

      if (nickname) promises.push({ key: 'nickname', promise: patchNickname(nickname) });

      // 개별 API의 실패가 전체를 무너뜨리지 않도록 allSettled 사용
      const results = await Promise.allSettled(promises.map(p => p.promise));

      // 결과를 객체 형태로 변환하여 반환
      return promises.reduce(
        (acc, current, index) => {
          const res = results[index] as PromiseSettledResult<UserT>;
          acc[current.key] = {
            isSuccess: res.status === 'fulfilled',
            error: res.status === 'rejected' ? res.reason : null,
          };
          return acc;
        },
        {} as Record<string, { isSuccess: boolean; error: unknown }>
      );
    },

    onSuccess: summary => {
      /** 이미지, 닉네임 중 하나라도 수정 성공 시 내 정보 쿼리 최신화 */
      const hasAnySuccess = Object.values(summary).some(r => r.isSuccess);
      if (hasAnySuccess) queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
};
