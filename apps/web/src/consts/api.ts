export const ENDPOINTS = {
  WISHLISTS: '/api/v1/wishlists',
  WISHLIST: (id: number) => `/api/v1/wishlists/${id}`,
  TOURNAMENT: (tournamentId: string) => `/api/v1/tournaments/${tournamentId}`,
} as const;
