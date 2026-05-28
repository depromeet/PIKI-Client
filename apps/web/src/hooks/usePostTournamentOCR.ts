import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { postTournamentOCR } from '@/apis/postTournamentOCR';
import type { ApiErrorResponseT } from '@/types/api';

export const usePostTournamentOCR = (tournamentId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: postTournamentOCRMutation, isPending: isPostTournamentOCRPending } = useMutation({
    mutationFn: (formData: FormData) => postTournamentOCR(tournamentId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tournament', tournamentId] });
    },
    onError: error => {
      if (!isAxiosError<ApiErrorResponseT>(error) || !error.response) return;

      /**
       * 400: 이미지 개수/형식/크기 초과
       * 403: 토너먼트 참여 권한 없음
       * 404: 토너먼트 존재하지 않음
       * 409: PENDING 상태 아닌 토너먼트
       */
      if (error.response.status === 400) toast.error(error.response.data.detail);
      else if (
        error.response.status === 403 ||
        error.response.status === 404 ||
        error.response.status === 409
      ) {
        toast.error(error.response.data.detail);
        router.replace('/home');
      } else if (error.response.status === 500) {
        toast.error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  return { postTournamentOCRMutation, isPostTournamentOCRPending };
};
