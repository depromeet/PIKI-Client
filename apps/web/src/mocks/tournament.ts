import type { Match, Product } from '@/types/tournament';

const p = (image: string, name: string, price: number, reason: string): Product => ({
  image: `/assets/tournament/${image}`,
  name,
  price,
  reason,
});

export const MOCK_MATCHES: Match[] = [
  {
    label: '8강 라운드 1',
    left: p('airpodsMax.png', '에어팟 맥스2', 849000, '신상이라 갖고싶음'),
    right: p('dysonAir.png', '다이슨 에어랩 코안다2x™', 779000, '판 고데기보다 편할 것 같음'),
  },
  {
    label: '8강 라운드 2',
    left: p('airpods.png', '에어팟 4세대', 229000, '가볍게 쓰기 좋을 것 같음'),
    right: p('appleWatch.png', '애플워치 시리즈10', 599000, '운동할 때 유용할 것 같음'),
  },
  {
    label: '8강 라운드 3',
    left: p('iMax.png', 'iMac M4', 1990000, '작업 속도가 빨라질 것 같음'),
    right: p('nikeShoes.png', '나이키 운동화', 189000, '디자인이 너무 예쁨'),
  },
  {
    label: '8강 라운드 4',
    left: p('airpodsMax.png', '에어팟 맥스2', 849000, '신상이라 갖고싶음'),
    right: p('airpods.png', '에어팟 4세대', 229000, '가볍게 쓰기 좋을 것 같음'),
  },
  {
    label: '4강 라운드 1',
    left: p('dysonAir.png', '다이슨 에어랩 코안다2x™', 779000, '판 고데기보다 편할 것 같음'),
    right: p('appleWatch.png', '애플워치 시리즈10', 599000, '운동할 때 유용할 것 같음'),
  },
  {
    label: '4강 라운드 2',
    left: p('iMax.png', 'iMac M4', 1990000, '작업 속도가 빨라질 것 같음'),
    right: p('airpodsMax.png', '에어팟 맥스2', 849000, '신상이라 갖고싶음'),
  },
  {
    label: '🏆 결승전',
    left: p('dysonAir.png', '다이슨 에어랩 코안다2x™', 779000, '판 고데기보다 편할 것 같음'),
    right: p('iMax.png', 'iMac M4', 1990000, '작업 속도가 빨라질 것 같음'),
  },
];
