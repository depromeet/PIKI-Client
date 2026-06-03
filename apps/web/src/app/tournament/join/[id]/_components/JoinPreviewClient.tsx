'use client';

import { notFound, useRouter } from 'next/navigation';
import { useState } from 'react';

import { MOCK_TOURNAMENT_PREVIEW } from '@/mocks/tournamentPreview';

import { DEFAULT_RANDOM_NICKNAME } from '../../_consts/randomNickname';
import JoinProfileDialog from './join-profile-dialog/JoinProfileDialog';

type JoinPreviewClientProps = {
  tournamentId: number | null;
};

function JoinPreviewClient({ tournamentId }: JoinPreviewClientProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  if (tournamentId === null) notFound();

  const handleConfirm = () => {
    setIsDialogOpen(false);
    router.push(`/tournament/${tournamentId}/create`);
  };

  return (
    <main className="relative flex min-h-dvh items-center justify-center bg-bg-layer-basement">
      <p className="body-1-medium text-text-neutral-tertiary">초대받은 토너먼트를 불러오는 중...</p>

      <JoinProfileDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        preview={MOCK_TOURNAMENT_PREVIEW}
        randomNickname={DEFAULT_RANDOM_NICKNAME}
        onConfirm={handleConfirm}
      />
    </main>
  );
}

export default JoinPreviewClient;
