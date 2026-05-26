<<<<<<< HEAD
export const ENDPOINTS = {
  /** 위시리스트 */
  WISHLISTS: '/api/v1/wishlists',
  WISHLIST: (id: number) => `/api/v1/wishlists/${id}`,
  WISH_OCR: '/api/v1/wishes/images',

  /** 토너먼트 */
  TOURNAMENTS: '/api/v1/tournaments',
  TOURNAMENT: (id: number) => `/api/v1/tournaments/${id}`,
  TOURNAMENT_START: (id: number) => `/api/v1/tournaments/${id}/start`,
  TOURNAMENT_MATCHES: (id: number) => `/api/v1/tournaments/${id}/matches`,
  TOURNAMENT_ITEM_LINK: (id: number) => `/api/v1/tournaments/${id}/items/link`,
  TOURNAMENT_OCR: (id: number) => `/api/v1/tournaments/${id}/items/images`,
=======
export const END_POINTS = {
  TOURNAMENT: (tournamentId: string) => `/api/v1/tournaments/${tournamentId}`,
  TOURNAMENT_ITEM_LINK: (tournamentId: string) => `/api/v1/tournaments/${tournamentId}/items/link`,
>>>>>>> fd38dd7 (feat: 토너먼트 아이템 링크 추가 API 및 훅 구현)
} as const;
