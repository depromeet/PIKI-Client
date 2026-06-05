'use client';

import { notFound, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { getTournamentList } from '@/apis/getTournamentList';
import { EditIconFill } from '@/assets/icons/fill';
import Button from '@/components/button';
import { Header } from '@/components/header';
import Input from '@/components/input';
import Spinner from '@/components/spinner';
import { useGetNicknameCheck } from '@/hooks/useGetNicknameCheck';
import { MOCK_TOURNAMENT_PREVIEW } from '@/mocks/tournamentPreview';

import { DEFAULT_RANDOM_NICKNAME } from '../../_consts/randomNickname';
import { setJoinWelcome } from '../../_utils/joinSession';

type JoinPreviewClientProps = {
  tournamentId: number | null;
};

const MAX_NICKNAME_LENGTH = 10;

function JoinPreviewClient({ tournamentId }: JoinPreviewClientProps) {
  const router = useRouter();
  const [nickname, setNickname] = useState(DEFAULT_RANDOM_NICKNAME.nickname);
  const [isJoining, setIsJoining] = useState(false);

  if (tournamentId === null) notFound();

  const trimmedNickname = nickname.trim();
  const { nicknameCheckData, isNicknameCheckFetching } = useGetNicknameCheck(nickname);
  const isNicknameAvailable = nicknameCheckData?.available !== false;
  const isComplete =
    trimmedNickname.length > 0 && isNicknameAvailable && !isNicknameCheckFetching && !isJoining;

  const handleConfirm = async () => {
    if (!isComplete) return;
    setIsJoining(true);

    try {
      const list = await getTournamentList(['PENDING', 'IN_PROGRESS']);
      const target = list?.[0];
      if (!target) {
        toast.warning('참여 가능한 토너먼트를 찾지 못했어요.');
        setIsJoining(false);
        return;
      }
      setJoinWelcome({
        tournamentId: target.tournamentId,
        nickname: trimmedNickname,
        profileType: DEFAULT_RANDOM_NICKNAME.profileType,
      });
      router.push(`/tournament/${target.tournamentId}/create`);
    } catch {
      toast.warning('잠시 후 다시 시도해주세요.');
      setIsJoining(false);
    }
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
          <p className="body-1-semibold text-text-neutral-primary">
            {MOCK_TOURNAMENT_PREVIEW.name}
          </p>
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
          aria-invalid={!isNicknameAvailable}
          {...(!isNicknameAvailable ? { helperText: '이미 사용 중인 닉네임이에요.' } : {})}
        />
      </section>

      <div className="mt-auto px-5">
        <Button size="lg" variant="primary" disabled={!isComplete} onClick={handleConfirm}>
          {isJoining ? <Spinner size={20} /> : '참여하기'}
        </Button>
      </div>
    </main>
  );
}

export default JoinPreviewClient;
