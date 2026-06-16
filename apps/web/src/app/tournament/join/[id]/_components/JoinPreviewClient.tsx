'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { usePatchMe } from '@/app/mypage/edit/_hooks/usePatchMe';
import { EditIconFill } from '@/assets/icons/fill';
import Button from '@/components/button';
import { Header } from '@/components/header';
import Input from '@/components/input';
import { useGetMe } from '@/hooks/useGetMe';
import { useGetNicknameCheck } from '@/hooks/useGetNicknameCheck';
import { usePageBackground } from '@/hooks/usePageBackground';

import { useGetInvitePreview } from '../../_hooks/useGetInvitePreview';
import { usePostJoin } from '../../_hooks/usePostJoin';
import { setJoinWelcome } from '../../_utils/joinSession';

type JoinPreviewClientProps = {
  tournamentId: number;
  /** 친구 초대 코드 — invite 진입 시 query 로 전달됨. join 호출 시 필수 */
  inviteCode: string;
};

const MAX_NICKNAME_LENGTH = 10;

function JoinPreviewClient({ tournamentId, inviteCode }: JoinPreviewClientProps) {
  /** 이 페이지는 흰색 배경(bg-layer-default) — iOS 노치 영역까지 흰색으로 칠해야 자연스럽다. */
  usePageBackground('var(--color-bg-layer-default)');

  const router = useRouter();
  const { userData } = useGetMe();
  const { patchMeMutation, isPatchMePending } = usePatchMe();
  const [nickname, setNickname] = useState(userData.nickname);

  const { invitePreviewData } = useGetInvitePreview(tournamentId);
  const { postJoinMutation, isPostJoinPending } = usePostJoin();

  const trimmedNickname = nickname.trim();
  const isNicknameChanged = trimmedNickname !== userData.nickname;
  const { nicknameCheckData, isNicknameCheckFetching } = useGetNicknameCheck(nickname);

  const isCheckingNickname =
    isNicknameChanged && trimmedNickname.length > 0 && isNicknameCheckFetching;

  const isNicknameValid =
    trimmedNickname.length > 0 &&
    (!isNicknameChanged || (!isNicknameCheckFetching && nicknameCheckData?.available === true));

  const showDuplicateError =
    isNicknameChanged && !isNicknameCheckFetching && nicknameCheckData?.available === false;

  const isComplete =
    isNicknameValid && !isCheckingNickname && !isPostJoinPending && !isPatchMePending;

  const joinTournament = (nickname: string) => {
    postJoinMutation(
      {
        tournamentId,
        body: { ...(inviteCode ? { inviteCode } : {}) },
      },
      {
        onSuccess: () => {
          setJoinWelcome({
            tournamentId,
            nickname: nickname,
            profileType:
              userData.id.charCodeAt(userData.id.length - 1) % 2 === 0 ? 'blue' : 'yellow',
          });
          router.push(`/tournament/${tournamentId}/create`);
        },
        onError: () => {
          toast.warning('참여에 실패했어요. 잠시 후 다시 시도해주세요.');
        },
      }
    );
  };

  const handleConfirm = () => {
    if (!isComplete) return;

    if (isNicknameChanged) {
      patchMeMutation(
        { nickname: trimmedNickname },
        {
          onSuccess: updatedUser => joinTournament(updatedUser.nickname),
        }
      );
      return;
    }

    joinTournament(trimmedNickname);
  };

  return (
    <main className="flex min-h-dvh flex-col bg-bg-layer-default pt-padding-top pb-8">
      <Header
        center="초대 참여하기"
        centerClassName="heading-1 text-text-neutral-primary"
        className="px-5"
      />

      <section className="mt-8.75 flex flex-col gap-2 px-5">
        <p className="body-2-semibold text-text-neutral-primary">초대받은 토너먼트</p>
        <div className="flex flex-col gap-1 rounded-xl bg-gray-50 p-4">
          <p className="body-1-semibold text-text-neutral-primary">
            {invitePreviewData.tournamentName}
          </p>
          <p className="body-2-medium text-text-neutral-secondary">
            후보 {invitePreviewData.itemCount}개 · 참여 {invitePreviewData.participantCount}명
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
          aria-invalid={showDuplicateError}
          {...(showDuplicateError ? { helperText: '이미 사용 중인 닉네임이에요.' } : {})}
        />
      </section>

      <div className="mt-auto px-5">
        <Button
          size="lg"
          variant="primary"
          disabled={!isComplete}
          onClick={handleConfirm}
          isLoading={isPostJoinPending || isPatchMePending}
        >
          참여하기
        </Button>
      </div>
    </main>
  );
}

export default JoinPreviewClient;
