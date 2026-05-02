import TargetIcon from '@/assets/images/icon-target.svg';
import type { ProductT } from '@/types/product';

type LegacyProductT = {
  url: string;
  shopName: string;
  shopHost: string;
  imageUrl: string;
  name: string;
  price: number;
  reason?: string;
};

export const mockProducts: LegacyProductT[] = [
  {
    url: 'https://www.29cm.co.kr/products/3896753',
    shopName: '29CM',
    shopHost: '29cm.onelink.me',
    imageUrl: '/images/mock-1-knit.png',
    name: '[3rd] Loose-fit paper knit',
    price: 61200,
    reason: '데일리룩에 잘 어울릴 것 같음',
  },
  {
    url: 'https://www.musinsa.com/app/goods/3010101',
    shopName: '무신사',
    shopHost: 'musinsa.com',
    imageUrl: '/images/mock-2-tshirt.png',
    name: '오버사이즈 그래픽 티셔츠 - 블랙',
    price: 49000,
    reason: '여름에 시원하게 입을 수 있을 것 같음',
  },
  {
    url: 'https://www.zigzag.kr/catalog/products/200201',
    shopName: '지그재그',
    shopHost: 'zigzag.kr',
    imageUrl: '/images/mock-3-shirt.png',
    name: '데님 와이드 셔츠 - 라이트 블루',
    price: 47900,
    reason: '코디 활용도가 높을 것 같음',
  },
  {
    url: 'https://www.coupang.com/vp/products/700100200',
    shopName: '쿠팡',
    shopHost: 'coupang.com',
    imageUrl: '/images/mock-4-shoes.png',
    name: '클래식 로퍼 - 블랙',
    price: 89000,
    reason: '오래 신어도 질리지 않을 것 같음',
  },
  {
    url: 'https://oliveyoung.co.kr/store/goods/A000000176090',
    shopName: '올리브영',
    shopHost: 'oliveyoung.co.kr',
    imageUrl: '/images/mock-6-cream.png',
    name: '닥터지 레드 블레미쉬 클리어 수딩 크림',
    price: 24000,
    reason: '피부 진정에 효과 좋다고 함',
  },
  {
    url: 'https://wconcept.co.kr/Product/302100100',
    shopName: 'W컨셉',
    shopHost: 'wconcept.co.kr',
    imageUrl: '/images/mock-7-pinktee.png',
    name: '슬림핏 핑크 티셔츠',
    price: 38000,
    reason: '봄에 포인트 컬러로 좋을 것 같음',
  },
  {
    url: 'https://ssg.com/item/itemView.ssg?itemId=1000567890',
    shopName: 'SSG',
    shopHost: 'ssg.com',
    imageUrl: '/images/mock-8-bag.png',
    name: '레오파드 미니 백 - 코랄',
    price: 128000,
    reason: '룩에 포인트가 될 것 같음',
  },
];

export const mockProduct = mockProducts[0]!;

export const getMockProductByIndex = (index: number): LegacyProductT => {
  return mockProducts[index % mockProducts.length]!;
};

/**
 * ------------------------------------------------------------
 * dummyProducts
 *
 * - 프리런칭 때 사용할 더미 데이터
 * ------------------------------------------------------------
 */

export const dummyProducts: ProductT[] = [
  {
    url: 'https://kream.co.kr/products/338430',
    thumbnail: '👟',
    name: '푸마 스피드캣 OG 블랙 모브 미스트',
    imagePath: '/images/mock-1-shoes.webp',
    price: 159000,
    tags: [
      {
        name: '한정판',
        icon: TargetIcon,
        iconColor: '#8AD9BB',
        backgroundColor: '#F0FAF6',
        textColor: '#2A805F',
      },
    ],
    platform: 'kream',
    platformLogoPath: '/images/logo-kream.png',
  },
  {
    url: 'https://www.29cm.co.kr/products/3845149',
    thumbnail: '🧥',
    name: 'Raglan Hidden Trench(Charcoal)',
    imagePath: '/images/mock-2-coat.webp',
    price: 275000,
    platform: '29cm',
    platformLogoPath: '/images/logo-29cm.jpeg',
  },
  {
    url: 'https://kream.co.kr/products/869177',
    thumbnail: '👕',
    name: '데우스 엑스 마키나 도쿄 컬리지 어드레스 티셔츠 블랙',
    imagePath: '/images/mock-3-tshirt.webp',
    price: 123000,
    tags: [
      {
        name: '크림 급상승 상의 4위',
        icon: TargetIcon,
        iconColor: '#FAE488',
        backgroundColor: '#FEFAEC',
        textColor: '#B49109',
      },
    ],
    platform: 'kream',
    platformLogoPath: '/images/logo-kream.png',
  },
  {
    url: 'https://www.musinsa.com/products/5646320',
    thumbnail: '🧢',
    name: '집가고싶당 모자',
    imagePath: '/images/mock-4-cap.webp',
    price: 36000,
    tags: [
      {
        name: '오늘 출발',
        icon: TargetIcon,
        iconColor: '#8AD9BB',
        backgroundColor: '#F0FAF6',
        textColor: '#2A805F',
      },
    ],
    platform: 'musinsa',
    platformLogoPath: '/images/logo-musinsa.png',
  },
  {
    url: 'https://www.coupang.com/vp/products/7662468776?itemId=20417875304&vendorItemId=95103167596&q=%EB%B3%B4%EC%8A%A4%20%ED%97%A4%EB%93%9C%ED%8F%B0&searchId=f16438589323374&sourceType=search&itemsCount=60&searchRank=3&rank=3&traceId=moo2syr0',
    thumbnail: '🎧',
    name: '보스 QC 울트라 헤드폰',
    imagePath: '/images/mock-5-headphone.avif',
    price: 377100,
    tags: [
      {
        name: '2000명 이상 만족',
        icon: TargetIcon,
        iconColor: '#8AD9BB',
        backgroundColor: '#F0FAF6',
        textColor: '#2A805F',
      },
    ],
    platform: 'coupang',
    platformLogoPath: '/images/logo-coupang.png',
  },
  {
    url: 'https://www.29cm.co.kr/products/3947119',
    thumbnail: '👜',
    name: '[단독] IUGA Big Shopper Bag (Purple)',
    imagePath: '/images/mock-6-bag.webp',
    price: 89000,
    platform: '29cm',
    platformLogoPath: '/images/logo-29cm.jpeg',
  },
  {
    url: 'https://kream.co.kr/products/119182',
    thumbnail: '🕶',
    name: '젠틀 몬스터 로코코 01 블랙',
    imagePath: '/images/mock-7-sunglasses.webp',
    price: 380000,
    platform: 'kream',
    platformLogoPath: '/images/logo-kream.png',
  },
  {
    url: 'https://www.musinsa.com/products/6241667',
    thumbnail: '👖',
    name: '[이렇게입어 동훈아] MAXIMIZING DENIM PANTS',
    imagePath: '/images/mock-8-pants.webp',
    price: 1063000,
    platform: 'musinsa',
    platformLogoPath: '/images/logo-musinsa.png',
  },
];
