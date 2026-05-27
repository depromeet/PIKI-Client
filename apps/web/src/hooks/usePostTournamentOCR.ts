import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postTournamentOCR } from '@/apis/postTournamentOCR';

export const usePostTournamentOCR = (tournamentId: number) => {
  const queryClient = useQueryClient();
  const { mutate: postTournamentOCRMutation } = useMutation({
    mutationFn: (formData: FormData) => postTournamentOCR(tournamentId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tournament', tournamentId] });
    },
  });

  return { postTournamentOCRMutation };
};
