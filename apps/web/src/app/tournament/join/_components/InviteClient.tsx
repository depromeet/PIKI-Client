'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { getMe } from '@/apis/getMe';
import { getTournamentList } from '@/apis/getTournamentList';
import Button from '@/components/button';
import { Header, HeaderIcon } from '@/components/header';
import Input from '@/components/input';
import Spinner from '@/components/spinner';
import { MOCK_TOURNAMENT_PREVIEW } from '@/mocks/tournamentPreview';

import { DEFAULT_RANDOM_NICKNAME } from '../_consts/randomNickname';
import { markAsParticipant, setJoinConfirm } from '../_utils/joinSession';
import { CODE_LENGTH, verifyInviteCode } from '../_utils/verifyInviteCode';

function InviteClient() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isComplete = code.length === CODE_LENGTH;
  const canSubmit = isComplete && !isSubmitting;

  const handleChange = (next: string) => {
    setCode(next.slice(0, CODE_LENGTH));
    if (hasError) setHasError(false);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    const verifyResult = verifyInviteCode(code);
    if (!verifyResult.ok) {
      setHasError(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const me = await getMe();
      if (me.identityType === 'GUEST') {
        router.push(`/tournament/join/${verifyResult.tournamentId}`);
        return;
      }

      const list = await getTournamentList(['PENDING', 'IN_PROGRESS']);
      const target = list?.[0];
      if (!target) {
        toast.warning('참여 가능한 토너먼트를 찾지 못했어요.');
        setIsSubmitting(false);
        return;
      }

      markAsParticipant(target.tournamentId);
      setJoinConfirm({
        tournamentId: target.tournamentId,
        nickname: me.nickname,
        profileType: DEFAULT_RANDOM_NICKNAME.profileType,
        tournamentName: MOCK_TOURNAMENT_PREVIEW.name,
        itemCount: MOCK_TOURNAMENT_PREVIEW.itemCount,
        participantCount: MOCK_TOURNAMENT_PREVIEW.participantCount,
      });
      router.push(`/tournament/${target.tournamentId}/create`);
    } catch {
      toast.warning('잠시 후 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-dvh flex-col bg-bg-layer-default pt-15 pb-8">
      <Header
        left={<HeaderIcon name="BACK" />}
        center="코드 입력하기"
        centerClassName="heading-1 text-text-neutral-primary"
        className="px-5"
      />

      <section className="mt-8.75 flex flex-col gap-2 px-5">
        <Input
          label="초대 코드"
          placeholder="초대 코드 6글자를 입력해주세요."
          value={code}
          onChange={event => handleChange(event.target.value)}
          aria-invalid={hasError}
          {...(hasError ? { helperText: '초대 코드가 존재하지 않습니다.' } : {})}
          autoFocus
          maxLength={CODE_LENGTH}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </section>

      <div className="mt-auto px-5">
        <Button size="lg" variant="primary" disabled={!canSubmit} onClick={handleSubmit}>
          {isSubmitting ? <Spinner size={20} /> : '참여하기'}
        </Button>
      </div>
    </main>
  );
}

export default InviteClient;
