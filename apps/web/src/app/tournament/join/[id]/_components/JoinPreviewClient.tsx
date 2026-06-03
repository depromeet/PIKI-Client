'use client';

import { notFound, useRouter } from 'next/navigation';
import { useState } from 'react';

import { EditIconFill } from '@/assets/icons/fill';
import Button from '@/components/common/button';
import { Header } from '@/components/common/header';
import Input from '@/components/common/input';
import { MOCK_TOURNAMENT_PREVIEW } from '@/mocks/tournamentPreview';

import { DEFAULT_RANDOM_NICKNAME } from '../../_consts/randomNickname';

type JoinPreviewClientProps = {
  tournamentId: number | null;
};

const MAX_NICKNAME_LENGTH = 12;

function JoinPreviewClient({ tournamentId }: JoinPreviewClientProps) {
  const router = useRouter();
  const [nickname, setNickname] = useState(DEFAULT_RANDOM_NICKNAME.nickname);

  if (tournamentId === null) notFound();

  const trimmedNickname = nickname.trim();
  const isComplete = trimmedNickname.length > 0;

  const handleConfirm = () => {
    if (!isComplete) return;
    router.push(`/tournament/${tournamentId}/create`);
  };

  return (
    <main className="flex min-h-dvh flex-col bg-bg-layer-default pt-15 pb-8">
      <Header
        center="초대 참여하기"
        centerClassName="heading-1 text-text-neutral-primary"
        className="px-5"
      />

      <section className="mt-8.75 flex flex-col gap-2 px-5">
        <p className="body-2-semibold text-text-neutral-primary">초대받은 토너먼트</p>
        <div className="flex flex-col gap-1 rounded-xl bg-gray-50 p-4">
          <p className="body-1-semibold text-text-neutral-primary">{MOCK_TOURNAMENT_PREVIEW.name}</p>
          <p className="body-2-medium text-text-neutral-secondary">
            후보 {MOCK_TOURNAMENT_PREVIEW.itemCount}개 · 참여{' '}
            {MOCK_TOURNAMENT_PREVIEW.participantCount}명
          </p>
        </div>
      </section>

      <section className="mt-8 px-5">
        <Input
          label="닉네임을 설정해주세요."
          value={nickname}
          onChange={event => setNickname(event.target.value)}
          right={<EditIconFill className="size-5" />}
          maxLength={MAX_NICKNAME_LENGTH}
        />
      </section>

      <div className="mt-auto px-5">
        <Button size="lg" variant="primary" disabled={!isComplete} onClick={handleConfirm}>
          참여하기
        </Button>
      </div>
    </main>
  );
}

export default JoinPreviewClient;
