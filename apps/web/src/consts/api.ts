export const API_ENDPOINTS = {
  WISHLISTS: {
    DETAIL: (wishId: number) => `/api/v1/wishlists/${wishId}`,
  },
} as const;
