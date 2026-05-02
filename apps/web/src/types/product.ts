import type { ReactNode } from 'react';

export type ProductT = {
  /** 상품 url */
  url: string;
  /** 상품 썸네일 */
  thumbnail: string;
  /** 상품 이름 */
  name: string;
  /** 상품 이미지 경로 */
  imagePath: string;
  /** 상품 가격 */
  price: number;
  /** 상품 태그 */
  tags?: TagT[];
  /** 상품 플랫폼 */
  platform: string;
  /** 상품 플랫폼 로고 경로 */
  platformLogoPath: string;
};

export type TagT = {
  /** 태그 이름 */
  name: string;
  /** 태그 아이콘 */
  icon: ReactNode;
  /** 태그 아이콘 색상 */
  iconColor: string;
  /** 태그 배경 색상 */
  backgroundColor: string;
  /** 태그 텍스트 색상 */
  textColor: string;
};
