import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { postTournamentItemsByWish } from '../_apis/postTournamentItemsByWish';

export const usePostTournamentItemsByWish = (tournamentId: number) => {
  const router = useRouter();

  const { mutate: postTournamentItemsByWishMutation, isPending: isPostTournamentItemsByWishPending } =
    useMutation({
      mutationFn: (itemIds: number[]) => postTournamentItemsByWish(tournamentId, { itemIds }),
      onSuccess: () => {
        router.push(`/tournament/${tournamentId}/create`);
      },
      onError: () => {
        toast.error('위시템 추가에 실패했어요. 잠시 후 다시 시도해주세요.');
      },
    });

  return { postTournamentItemsByWishMutation, isPostTournamentItemsByWishPending };
};
