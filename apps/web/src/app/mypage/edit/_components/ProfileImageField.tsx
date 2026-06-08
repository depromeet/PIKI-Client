'use client';

import { SUPPORTED_IMAGE_MIME_TYPES } from '@piki/core';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { CameraIconFill } from '@/assets/icons';
import UserProfileBlue from '@/assets/images/user-profile-blue.svg';
import { useImagePicker } from '@/hooks/useImagePicker';
import type { UserIdentityTypeT } from '@/types/user';

type Props = {
  userIdentityType: UserIdentityTypeT;
  profileImage: string;
  onImageSelect?: (file: File) => void;
};

function ProfileImageField({ userIdentityType, profileImage, onImageSelect }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { openPicker, inputRef, handleInputChange, isPending } = useImagePicker({
    maxCount: 1,
    onSuccess: files => {
      const [file] = files;
      if (!file) return;

      setPreviewUrl(prev => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
      onImageSelect?.(file);
    },
  });

  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl]
  );

  const displayUrl = previewUrl ?? (profileImage || null);

  return (
    <>
      <div className="relative mx-auto size-[90px]">
        {displayUrl ? (
          <div className="relative size-[90px] overflow-hidden rounded-full">
            <Image
              src={displayUrl}
              alt="프로필 이미지"
              width={90}
              height={90}
              className="object-cover"
            />
          </div>
        ) : (
          <UserProfileBlue className="size-[90px]" aria-hidden />
        )}
        {userIdentityType === 'MEMBER' && (
          <button
            type="button"
            onClick={openPicker}
            disabled={isPending}
            aria-label="프로필 이미지 변경"
            className="absolute top-[54.5px] left-[59px] flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-bg-layer-default"
          >
            <CameraIconFill className="size-6 shrink-0 text-icon-neutral-secondary" />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={SUPPORTED_IMAGE_MIME_TYPES.join(', ')}
        className="hidden"
        onChange={handleInputChange}
      />
    </>
  );
}

export default ProfileImageField;
