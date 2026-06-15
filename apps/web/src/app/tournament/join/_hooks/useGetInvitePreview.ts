import { useSuspenseQuery } from '@tanstack/react-query';

import { getInvitePreview } from '../_apis/getInvitePreview';

export const useGetInvitePreview = (tournamentId: number) => {
  const { data: invitePreviewData } = useSuspenseQuery({
    queryKey: ['invitePreview', tournamentId],
    queryFn: () => getInvitePreview(tournamentId),
  });

  return { invitePreviewData };
};
