'use client';

import { useParams } from 'next/navigation';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { useGetTournamentItem } from '@/app/tournament/[id]/create/_hooks/useGetTournamentItem';
import { usePostTournamentItemLink } from '@/app/tournament/[id]/create/_hooks/usePostTournamentItemLink';
import { Dialog, DialogTrigger } from '@/components/common/dialog';
import GetItemDialogContent from '@/components/common/get-item-dialog';

type AddWishDialogProps = {
  trigger: ReactNode;
};

function AddWishDialog({ trigger }: AddWishDialogProps) {
  const { id: tournamentId } = useParams<{ id: string }>();
  const [tournamentItemId, setTournamentItemId] = useState<number | null>(null);

  const { postTournamentItemLinkMutation } = usePostTournamentItemLink(Number(tournamentId));
  useGetTournamentItem(Number(tournamentId), tournamentItemId);

  const handleLinkSubmit = (url: string) => {
    postTournamentItemLinkMutation(url, {
      onSuccess: ({ tournamentItemId }) => {
        setTournamentItemId(tournamentItemId);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <GetItemDialogContent type="tournament" onLinkSubmit={handleLinkSubmit} />
    </Dialog>
  );
}

export default AddWishDialog;
