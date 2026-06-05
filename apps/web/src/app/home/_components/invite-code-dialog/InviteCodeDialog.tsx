'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '@/components/common/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/common/dialog';
import Input from '@/components/common/input';

import { CODE_LENGTH, verifyInviteCode } from '../../../tournament/join/_utils/verifyInviteCode';
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

  const isComplete = code.length === CODE_LENGTH;

  const reset = () => {
    setCode('');
    setShowFormatError(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleChange = (next: string) => {
    setCode(next.slice(0, CODE_LENGTH));
    if (showFormatError) setShowFormatError(false);
  };

  const handleSubmit = () => {
    if (!isComplete) return;

    const result = verifyInviteCode(code);
    if (result.ok) {
      onOpenChange(false);
      reset();
      router.push(`/tournament/join/${result.tournamentId}`);
      return;
    }

    if (result.reason === 'INVALID_FORMAT') {
      setShowFormatError(true);
      return;
    }

    setIsInvalidDialogOpen(true);
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
            placeholder="ex. pik123"
            value={code}
            onChange={event => handleChange(event.target.value)}
            aria-invalid={showFormatError}
            {...(showFormatError ? { helperText: '영문 + 숫자 조합의 6자리로 입력해주세요.' } : {})}
            maxLength={CODE_LENGTH}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            autoFocus
          />

          <Button size="lg" variant="primary" disabled={!isComplete} onClick={handleSubmit}>
            입장하기
          </Button>
        </DialogContent>
      </Dialog>

      <InvalidCodeDialog open={isInvalidDialogOpen} onOpenChange={setIsInvalidDialogOpen} />
    </>
  );
}

export default InviteCodeDialog;
