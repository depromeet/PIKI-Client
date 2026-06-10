export const ENDPOINTS = {
  /** 인증 */
  AUTH_URL: (provider: string) => `/api/v1/auth/${provider}/url`,
  AUTH_LOGIN: (provider: string) => `/api/v1/auth/login/${provider}`,
  AUTH_GUEST: '/api/v1/auth/guest',
  AUTH_LOGOUT: '/api/v1/auth/logout',
  AUTH_TOKEN_REFRESH: '/api/v1/auth/token/refresh',

  /** 위시리스트 */
  WISHLISTS: '/api/v1/wishlists',
  WISHLIST: (id: number) => `/api/v1/wishlists/${id}`,
  WISH_OCR: '/api/v1/wishlists/images',

  /** 토너먼트 */
  TOURNAMENTS: '/api/v1/tournaments',
  TOURNAMENT: (id: number) => `/api/v1/tournaments/${id}`,
  TOURNAMENT_START: (id: number) => `/api/v1/tournaments/${id}/start`,
  TOURNAMENT_MATCHES: (id: number) => `/api/v1/tournaments/${id}/matches`,
  TOURNAMENT_ITEM_LINK: (id: number) => `/api/v1/tournaments/${id}/items/link`,
  TOURNAMENT_OCR: (id: number) => `/api/v1/tournaments/${id}/items/images`,
  TOURNAMENT_ITEM: (id: number, ItemId: number) => `/api/v1/tournaments/${id}/items/${ItemId}`,
  TOURNAMENT_ITEMS_FROM_WISH: (id: number) => `/api/v1/tournaments/${id}/items/wish`,

  /** FCM */
  FCM_TOKENS: '/api/v1/fcm/tokens',
} as const;
