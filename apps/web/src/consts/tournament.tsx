import Image from 'next/image';

import imageIcon from '@/assets/icons/tournament/image.svg';
import promoIcon from '@/assets/icons/tournament/promo.svg';
import thumbsIcon from '@/assets/icons/tournament/thumbs up.svg';
import truckIcon from '@/assets/icons/tournament/truck.svg';
import vectorIcon from '@/assets/icons/tournament/vector.svg';
import type { TagT } from '@/types/product';

export const FINAL_LEFT_TAGS: TagT[] = [
  {
    name: '할인 중',
    icon: <Image src={promoIcon} alt="" width={14} height={14} />,
    iconColor: '#1D64ED',
    backgroundColor: '#EBF1FD',
    textColor: '#1D64ED',
  },
  {
    name: '오늘 출발',
    icon: <Image src={truckIcon} alt="" width={14} height={14} />,
    iconColor: '#E07B39',
    backgroundColor: '#FEF3EC',
    textColor: '#E07B39',
  },
];

export const FINAL_RIGHT_TAGS: TagT[] = [
  {
    name: '만족도 높음',
    icon: <Image src={thumbsIcon} alt="" width={14} height={14} />,
    iconColor: '#B49109',
    backgroundColor: '#FEFAEC',
    textColor: '#B49109',
  },
  {
    name: '후기 많음',
    icon: <Image src={imageIcon} alt="" width={14} height={14} />,
    iconColor: '#2A805F',
    backgroundColor: '#F0FAF6',
    textColor: '#2A805F',
  },
  {
    name: '시즌 상품',
    icon: <Image src={vectorIcon} alt="" width={14} height={14} />,
    iconColor: '#6B4EFF',
    backgroundColor: '#F3F0FF',
    textColor: '#6B4EFF',
  },
];
