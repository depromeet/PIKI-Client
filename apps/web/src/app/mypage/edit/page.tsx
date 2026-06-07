import BottomCta from '@/components/bottom-cta';
import Button from '@/components/button';
import { Header, HeaderIcon } from '@/components/header';
import Spacing from '@/components/spacing';

import NicknameField from './_components/NicknameField';
import ProfileImageField from './_components/ProfileImageField';

function MypageEditPage() {
  return (
    <div className="flex h-dvh flex-col bg-bg-layer-basement px-5 pt-20">
      <Header
        left={<HeaderIcon name="BACK" className="size-7.5" />}
        center="내 프로필 수정"
        centerClassName="title-1 text-[#171719]"
      />

      <Spacing size={60} />

      <div className="hide-scrollbar flex flex-1 flex-col overflow-y-auto pb-[98px]">
        <ProfileImageField />

        <Spacing size={29} />

        <NicknameField />
      </div>

      <BottomCta className="border-t border-gray-50 bg-bg-layer-basement pb-8">
        <Button variant="primary" size="lg" className="w-full">
          수정하기
        </Button>
      </BottomCta>
    </div>
  );
}

export default MypageEditPage;
