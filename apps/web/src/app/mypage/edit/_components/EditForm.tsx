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
  // const { patchMeMutation, isPatchMePending } = usePatchMe();

  const [nickname, setNickname] = useState(userData.nickname);
  const [isNickNameError, setIsNickNameError] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const trimmedNickname = nickname.trim();
  const isNicknameChanged = trimmedNickname !== userData.nickname;
  const hasProfileImageChange = profileImageFile !== null;
  const hasChanges = isNicknameChanged || hasProfileImageChange;

  /**
   * 수정 버튼 비활성화 조건
   * - 변경 사항이 없거나
   * - 닉네임이 비어있거나
   * - 닉네임이 변경됐는데 중복 체크가 되지 않았을 때
   */
  const isNicknameValid = trimmedNickname.length > 0 && (!isNicknameChanged || isNicknameChecked);
  const isEditDisabled = !hasChanges || !isNicknameValid;
  // const isEditDisabled = !hasChanges || !isNicknameValid || isPatchMePending;

  /** 닉네임 변경 시 */
  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setIsNickNameError(false);
    setIsNicknameChecked(false);
  };

  /** 닉네임 중복 체크 */
  const handleCheckDuplicate = () => {
    getNicknameCheckMutation(trimmedNickname, {
      onSuccess: ({ available }) => {
        setIsNickNameError(!available);
        setIsNicknameChecked(available);
      },
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEditDisabled) return;

    // patchMeMutation({
    //   ...(isNicknameChanged ? { nickname: trimmedNickname } : {}),
    //   ...(profileImageFile ? { profileImage: profileImageFile } : {}),
    // });
  };

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="hide-scrollbar flex flex-1 flex-col overflow-y-auto pb-[98px]">
        <ProfileImageField
          userIdentityType={userData.identityType}
          profileImage={userData.profileImage}
          onImageSelect={setProfileImageFile}
        />

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
          {/* {isPatchMePending ? <Spinner size={20} /> : '수정하기'} */}
        </Button>
      </BottomCta>
    </form>
  );
}

export default EditForm;
