export const ENDPOINTS = {
  /** 위시리스트 */
  WISHLISTS: '/api/v1/wishlists',
  WISHLIST: (id: number) => `/api/v1/wishlists/${id}`,
  WISH_OCR: '/api/v1/wishes/images',

  /** 토너먼트 */
  TOURNAMENT: (tournamentId: string) => `/api/v1/tournaments/${tournamentId}`,
  TOURNAMENT_START: (tournamentId: string) => `/api/v1/tournaments/${tournamentId}/start`,
  TOURNAMENT_ITEM_LINK: (tournamentId: string) => `/api/v1/tournaments/${tournamentId}/items/link`,
  TOURNAMENT_OCR: (tournamentId: number) => `/api/v1/tournaments/${tournamentId}/items/images`,
} as const;
