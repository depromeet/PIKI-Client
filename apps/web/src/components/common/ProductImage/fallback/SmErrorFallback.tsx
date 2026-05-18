import Image from 'next/image';

import warningImage from '@/assets/icons/warning.png';

export function SmErrorFallback() {
  return (
    <div className="absolute -top-2 -right-2">
      <Image src={warningImage} width={20} height={20} alt="경고" />
    </div>
  );
}
