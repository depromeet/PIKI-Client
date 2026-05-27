'use client';

import { useParams } from 'next/navigation';
import type { ReactNode } from 'react';

import { usePostTournamentItemLink } from '@/app/tournament/[id]/create/_hooks/usePostTournamentItemLink';
import { Dialog, DialogTrigger } from '@/components/common/dialog';
import GetItemDialogContent from '@/components/common/get-item-dialog';

type AddWishDialogProps = {
  trigger: ReactNode;
};

function AddWishDialog({ trigger }: AddWishDialogProps) {
  const { id: tournamentId } = useParams<{ id: string }>();
  const { postItemLink } = usePostTournamentItemLink(tournamentId);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <GetItemDialogContent type="tournament" onLinkSubmit={postItemLink} />
    </Dialog>
  );
}

export default AddWishDialog;
