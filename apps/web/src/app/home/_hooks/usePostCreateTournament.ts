import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postCreateTournament } from '../_apis/postCreateTournament';

export const usePostCreateTournament = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: postCreateTournament,
    onSuccess: ({ tournamentId }) => {
      router.push(`/tournament/create?tournamentId=${tournamentId}`);
    },
  });

  return { mutate, isPending };
};
