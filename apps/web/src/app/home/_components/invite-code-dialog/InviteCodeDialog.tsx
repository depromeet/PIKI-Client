'use client';

import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { getInvitePreviewByCode } from '@/app/tournament/join/_apis/getInvitePreviewByCode';
import {
  CODE_LENGTH,
  isValidInviteCodeFormat,
} from '@/app/tournament/join/_utils/verifyInviteCode';
import Button from '@/components/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/dialog';
import Input from '@/components/input';
import Spinner from '@/components/spinner';
import TournamentErrorDialog from '@/components/tournament-error-dialog';

import InvalidCodeDialog from './InvalidCodeDialog';

type InviteCodeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function InviteCodeDialog({ open, onOpenChange }: InviteCodeDialogProps) {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [showFormatError, setShowFormatError] = useState(false);
  const [isInvalidDialogOpen, setIsInvalidDialogOpen] = useState(false);
  const [isTournamentErrorDialogOpen, setIsTournamentErrorDialogOpen] = useState(false);

  const { mutate: previewMutation, isPending: isPreviewPending } = useMutation({
    mutationFn: getInvitePreviewByCode,
    // mutation 진행 중 사용자가 input 을 바꿀 수 있으므로
    // 검증에 사용한 변수 (variables) 를 그대로 라우팅에 쓴다 — state 의 code 를 다시 읽지 않는다.
    onSuccess: (data, enteredCode) => {
      onOpenChange(false);
      reset();
      router.push(`/tournament/join/${data.tournamentId}?code=${enteredCode}`);
    },
    onError: error => {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        /** 400: 코드 불일치 */
        if (status === 400) {
          onOpenChange(false);
          setIsInvalidDialogOpen(true);
          return;
        }

        /** 409: 초대 코드 만료 */
        if (status === 409) {
          onOpenChange(false);
          setIsTournamentErrorDialogOpen(true);
          return;
        }
      }
      setIsInvalidDialogOpen(true);
    },
  });

  const isComplete = code.length === CODE_LENGTH;
  const canSubmit = isComplete && !isPreviewPending;

  const reset = () => {
    setCode('');
    setShowFormatError(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleChange = (next: string) => {
    setCode(next.slice(0, CODE_LENGTH).toUpperCase());
    if (showFormatError) setShowFormatError(false);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    if (!isValidInviteCodeFormat(code)) {
      setShowFormatError(true);
      return;
    }

    previewMutation(code);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent showCloseButton={false} className="flex flex-col gap-5 p-6">
          <DialogTitle className="text-center heading-1 text-text-neutral-primary">
            초대받은 토너먼트
          </DialogTitle>
          <DialogDescription className="sr-only">초대 코드를 입력해 입장합니다.</DialogDescription>

          <Input
            label="초대 코드"
            placeholder="ex. ABC123"
            value={code}
            onChange={event => handleChange(event.target.value)}
            aria-invalid={showFormatError}
            {...(showFormatError
              ? { helperText: '영문 대문자 3자 + 숫자 3자로 입력해주세요.' }
              : {})}
            maxLength={CODE_LENGTH}
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            autoFocus
          />

          <Button size="lg" variant="primary" disabled={!canSubmit} onClick={handleSubmit}>
            {isPreviewPending ? <Spinner size={20} /> : '입장하기'}
          </Button>
        </DialogContent>
      </Dialog>

      <InvalidCodeDialog open={isInvalidDialogOpen} onOpenChange={setIsInvalidDialogOpen} />
      <TournamentErrorDialog
        type="LINK_EXPIRED"
        open={isTournamentErrorDialogOpen}
        onOpenChange={setIsTournamentErrorDialogOpen}
      />
    </>
  );
}

export default InviteCodeDialog;
