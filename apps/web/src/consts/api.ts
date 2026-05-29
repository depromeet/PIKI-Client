export const ENDPOINTS = {
  WISHLISTS: '/api/v1/wishlists',
  WISHLIST: (id: number) => `/api/v1/wishlists/${id}`,
  TOURNAMENTS: '/api/v1/tournaments',
  TOURNAMENT: (id: number) => `/api/v1/tournaments/${id}`,
  TOURNAMENT_START: (id: number) => `/api/v1/tournaments/${id}/start`,
  TOURNAMENT_MATCHES: (id: number) => `/api/v1/tournaments/${id}/matches`,
} as const;
