/** PATCH /api/v1/wishlists/{wishId} 요청 바디 */
export type PatchWishPayloadT = {
  /** 수정할 상품명 */
  name?: string | null;
  /** 수정할 현재 판매가 */
  currentPrice?: number | null;
  /** 수정할 대표 이미지 URL */
  imageUrl?: string | null;
  /** 수정할 통화 코드 (ISO 4217) */
  currency?: string | null;
};

/** 위시리스트 조회 응답 data[] 항목 */
export type WishlistEntryT = {
  /** 위시 정보 */
  wish: {
    /** 위시 ID (삭제 API에 사용) */
    id: number;
    /** 등록일시 */
    createdAt: string;
  };
  /** 상품 정보 */
  item: {
    /** 상품 ID */
    id: number;
    /** 상품명 */
    name: string;
    /** 현재 가격 */
    currentPrice: number;
    /** 통화 */
    currency: string;
    /** 상품 이미지 URL */
    imageUrl: string;
    /** 상품 원본 URL */
    sourceUrl: string;
  };
};
