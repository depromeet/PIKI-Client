'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '@/components/common/button';
import { Header, HeaderIcon } from '@/components/common/header';
import Input from '@/components/common/input';

import { CODE_LENGTH, verifyInviteCode } from '../_utils/verifyInviteCode';

function InviteClient() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [hasError, setHasError] = useState(false);

  const isComplete = code.length === CODE_LENGTH;

  const handleChange = (next: string) => {
    setCode(next.slice(0, CODE_LENGTH));
    if (hasError) setHasError(false);
  };

  const handleSubmit = () => {
    if (!isComplete) return;
    const result = verifyInviteCode(code);
    if (!result.ok) {
      setHasError(true);
      return;
    }
    router.push(`/tournament/join/${result.tournamentId}`);
  };

  return (
    <main className="flex min-h-dvh flex-col bg-bg-layer-default pt-15 pb-8">
      <Header left={<HeaderIcon name="BACK" />} center="코드 입력하기" className="px-5" />

      <section className="mt-8 flex flex-col gap-2 px-5">
        <Input
          label="초대 코드"
          placeholder="초대 코드 6글자를 입력해주세요."
          value={code}
          onChange={event => handleChange(event.target.value)}
          aria-invalid={hasError}
          {...(hasError ? { helperText: '코드가 올바르지 않아요. 다시 입력해주세요.' } : {})}
          autoFocus
          maxLength={CODE_LENGTH}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </section>

      <div className="mt-auto px-5">
        <Button size="lg" variant="primary" disabled={!isComplete} onClick={handleSubmit}>
          참여하기
        </Button>
      </div>
    </main>
  );
}

export default InviteClient;
