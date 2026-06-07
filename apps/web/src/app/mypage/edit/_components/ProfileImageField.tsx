import { CameraIconFill } from '@/assets/icons';
import UserProfileBlue from '@/assets/images/user-profile-blue.svg';

function ProfileImageField() {
  return (
    <div className="relative mx-auto size-[90px]">
      <UserProfileBlue className="size-[90px]" aria-hidden />
      <button
        type="button"
        aria-label="프로필 이미지 변경"
        className="absolute top-[54.5px] left-[59px] flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-bg-layer-default"
      >
        <CameraIconFill className="size-6 shrink-0 text-icon-neutral-secondary" />
      </button>
    </div>
  );
}

export default ProfileImageField;
