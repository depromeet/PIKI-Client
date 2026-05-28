export const ENDPOINTS = {
  WISHLISTS: '/api/v1/wishlists',
  WISHLIST: (id: number) => `/api/v1/wishlists/${id}`,
  WISH_OCR: '/api/v1/wishes/images',
  TOURNAMENT_OCR: (tournamentId: number) => `/api/v1/tournaments/${tournamentId}/items/images`,
} as const;
