'use client';

import { type FormEvent, useState } from 'react';

import BottomCta from '@/components/bottom-cta';
import Button from '@/components/button';
import Spacing from '@/components/spacing';
import { useGetMe } from '@/hooks/useGetMe';

import { useGetNicknameCheck } from '../_hooks/useGetNicknameCheck';
import NicknameField from './NicknameField';
import ProfileImageField from './ProfileImageField';

function EditForm() {
  const { userData } = useGetMe();
  const { getNicknameCheckMutation, isGetNicknameCheckPending } = useGetNicknameCheck();

  const [nickname, setNickname] = useState(userData.nickname);
  const [isNickNameError, setIsNickNameError] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  /**
   * 수정 버튼 비활성화 조건
   * - 닉네임이 비어있거나
   * - 중복 체크가 되지 않았을 때
   */
  const isEditDisabled = !nickname.trim() || !isNicknameChecked;

  const handleCheckDuplicate = () => {
    getNicknameCheckMutation(nickname.trim(), {
      onSuccess: ({ available }) => {
        setIsNickNameError(!available);
        setIsNicknameChecked(available);
      },
    });
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setIsNickNameError(false);
    setIsNicknameChecked(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="hide-scrollbar flex flex-1 flex-col overflow-y-auto pb-[98px]">
        <ProfileImageField />

        <Spacing size={29} />

        <NicknameField
          value={nickname}
          onChange={handleNicknameChange}
          onCheckDuplicate={handleCheckDuplicate}
          isChecking={isGetNicknameCheckPending}
          isError={isNickNameError}
        />
      </div>

      <BottomCta className="border-t border-gray-50 bg-bg-layer-basement pb-8">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isEditDisabled}
        >
          수정하기
        </Button>
      </BottomCta>
    </form>
  );
}

export default EditForm;
