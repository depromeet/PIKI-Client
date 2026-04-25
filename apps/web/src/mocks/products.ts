import type { ProductT } from '@/types/wish';

export const mockProducts: ProductT[] = [
  {
    url: 'https://29cm.onelink.me/1080201211/vitofeg8',
    shopName: '29CM',
    shopHost: '29cm.onelink.me',
    imageUrl: '/images/mock-1-knit.png',
    name: '[3rd] Loose-fit paper knit [KNSS07KN01]_Cream beige',
    price: 61200,
  },
  {
    url: 'https://www.musinsa.com/app/goods/3010101',
    shopName: '무신사',
    shopHost: 'musinsa.com',
    imageUrl: '/images/mock-2-tshirt.png',
    name: '오버사이즈 그래픽 티셔츠 - 블랙',
    price: 49000,
  },
  {
    url: 'https://www.zigzag.kr/catalog/products/200201',
    shopName: '지그재그',
    shopHost: 'zigzag.kr',
    imageUrl: '/images/mock-3-shirt.png',
    name: '데님 와이드 셔츠 - 라이트 블루',
    price: 47900,
  },
  {
    url: 'https://www.coupang.com/vp/products/700100200',
    shopName: '쿠팡',
    shopHost: 'coupang.com',
    imageUrl: '/images/mock-4-shoes.png',
    name: '클래식 로퍼 - 블랙',
    price: 89000,
  },
  {
    url: 'https://kream.co.kr/products/12345',
    shopName: '크림',
    shopHost: 'kream.co.kr',
    imageUrl: '/images/mock-5-sneakers.png',
    name: '나이키 에어맥스 95 그레이',
    price: 159000,
  },
  {
    url: 'https://oliveyoung.co.kr/store/goods/A000000176090',
    shopName: '올리브영',
    shopHost: 'oliveyoung.co.kr',
    imageUrl: '/images/mock-6-cream.png',
    name: '닥터지 레드 블레미쉬 클리어 수딩 크림',
    price: 24000,
  },
  {
    url: 'https://wconcept.co.kr/Product/302100100',
    shopName: 'W컨셉',
    shopHost: 'wconcept.co.kr',
    imageUrl: '/images/mock-7-pinktee.png',
    name: '슬림핏 핑크 티셔츠',
    price: 38000,
  },
  {
    url: 'https://ssg.com/item/itemView.ssg?itemId=1000567890',
    shopName: 'SSG',
    shopHost: 'ssg.com',
    imageUrl: '/images/mock-8-bag.png',
    name: '레오파드 미니 백 - 코랄',
    price: 128000,
  },
];

export const mockProduct = mockProducts[0]!;

export const getMockProductByIndex = (index: number): ProductT => {
  return mockProducts[index % mockProducts.length]!;
};
