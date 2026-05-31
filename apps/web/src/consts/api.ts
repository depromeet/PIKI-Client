export const ENDPOINTS = {
  WISHLISTS: '/api/v1/wishlists',
  WISHLIST: (id: number) => `/api/v1/wishlists/${id}`,
  TOURNAMENT: (tournamentId: string) => `/api/v1/tournaments/${tournamentId}`,
  TOURNAMENT_START: (tournamentId: string) => `/api/v1/tournaments/${tournamentId}/start`,
  TOURNAMENT_ITEM_LINK: (tournamentId: string) => `/api/v1/tournaments/${tournamentId}/items/link`,
  TOURNAMENT_ITEMS_FROM_WISH: (tournamentId: number) =>
    `/api/v1/tournaments/${tournamentId}/items/wish`,
} as const;
