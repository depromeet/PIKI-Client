import type { ProductT } from '@/app/tournament/_types/tournament';

// 토너먼트 진행/결과 화면용 더미 상품 (8강 기준 8개)
// TODO: API 연동 시 실제 위시 데이터로 교체
export const MOCK_PRODUCTS: ProductT[] = [
  {
    id: 1,
    url: 'https://kream.co.kr/products/338430',
    name: '푸마 스피드캣 OG 블랙 모브 미스트',
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format',
    price: 159000,
  },
  {
    id: 2,
    url: 'https://www.29cm.co.kr/products/3845149',
    name: 'Raglan Hidden Trench (Charcoal)',
    imageUrl:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=400&fit=crop&auto=format',
    price: 275000,
  },
  {
    id: 3,
    url: 'https://kream.co.kr/products/869177',
    name: '데우스 엑스 마키나 도쿄 컬리지 티셔츠 블랙',
    imageUrl:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format',
    price: 123000,
  },
  {
    id: 4,
    url: 'https://www.musinsa.com/products/5646320',
    name: '집가고싶당 모자',
    imageUrl:
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop&auto=format',
    price: 36000,
  },
  {
    id: 5,
    url: 'https://www.coupang.com/vp/products/7662468776',
    name: '보스 QC 울트라 헤드폰',
    imageUrl:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop&auto=format',
    price: 377100,
  },
  {
    id: 6,
    url: 'https://www.29cm.co.kr/products/3947119',
    name: '[단독] IUGA Big Shopper Bag (Purple)',
    imageUrl:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&auto=format',
    price: 89000,
  },
  {
    id: 7,
    url: 'https://kream.co.kr/products/119182',
    name: '젠틀 몬스터 로코코 01 블랙',
    imageUrl:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&auto=format',
    price: 380000,
  },
  {
    id: 8,
    url: 'https://www.musinsa.com/products/6241667',
    name: 'MAXIMIZING DENIM PANTS',
    imageUrl:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&auto=format',
    price: 106300,
  },
];
