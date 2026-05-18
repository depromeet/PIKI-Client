import Image from 'next/image';

import emptyImage from '@/assets/icons/image.png';

export function LgErrorFallback() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image src={emptyImage} width={48} height={48} alt="" />
      <p className="heading-2 text-gray-300">이미지가 비어 있어요</p>
      <p className="body-2-medium text-gray-600">직접 가져오기</p>
    </div>
  );
}
