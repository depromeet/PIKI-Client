'use client';

import { useState } from 'react';

import { EditIconFill, TrophyIconFill } from '@/assets/icons';
import Button from '@/components/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/dialog';
import Input from '@/components/input';

import { usePostCreateTournament } from '../_hooks/usePostCreateTournament';

/** 토너먼트 생성 시 기본 초대 마감 시각 — 현재 + 30분. */
const DEFAULT_INVITE_DURATION_MINUTES = 30;

function CreateTournamentDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const { postCreateTournamentMutation, isPostCreateTournamentPending } = usePostCreateTournament();

  const trimmedName = name.trim();
  const isDisabled = trimmedName.length === 0 || isPostCreateTournamentPending;

  const handleCreate = () => {
    if (isDisabled) return;
    postCreateTournamentMutation(
      { name: trimmedName, inviteDurationMinutes: DEFAULT_INVITE_DURATION_MINUTES },
      {
        onSuccess: () => {
          setOpen(false);
          setName('');
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-[12px] bg-bg-layer-default p-5"
        >
          <TrophyIconFill className="size-8 text-yellow-400" />
          <span className="body-1-semibold text-text-neutral-primary">토너먼트 만들기</span>
        </button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="flex flex-col gap-5">
        <DialogTitle className="text-center heading-1 text-text-neutral-primary">
          새 토너먼트
        </DialogTitle>
        <div className="flex flex-col gap-[15px]">
          <Input
            label="토너먼트 이름"
            placeholder="ex.이번주 신발 고르기"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            maxLength={30}
            right={isDisabled ? <EditIconFill className="size-5" /> : null}
          />
          <Button size="lg" variant="primary" disabled={isDisabled} onClick={handleCreate}>
            생성하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTournamentDialog;
