import type { ItemTypeT } from '@/types/item';

/** NOTE: 수정 시 src/utils/getRouteType.ts 도 함께 수정 필요 */
export const ROUTES = {
  /** 1. Public (Anonymous) */
  ROOT: '/',
  LOGIN: '/login',

  /** 2. Member & Guest */
  HOME: '/home',
  TOURNAMENT_JOIN_BY_CODE: '/tournament/join',
  TOURNAMENT_JOIN_BY_LINK: (id: number) => `/tournament/join/${id}`,
  NOTIFICATION: '/notification',

  /** 3. Member Only */
  ARCHIVE_BASE: '/archive',
  ARCHIVE: (tab: ItemTypeT = 'wish') => `/archive?tab=${tab}`,
  WISH_EDIT: (wishId: number) => `/archive/wish/${wishId}`,
  SOCIAL_LOGIN_CALLBACK: (provider: string) => `/auth/callback/${provider}`,

  /** 4. Authorized Guest or Member */
  TOURNAMENT_CREATE: (tournamentId: number) => `/tournament/${tournamentId}/create`,
  TOURNAMENT_ADD_ITEM_BY_WISH: (tournamentId: number) =>
    `/tournament/${tournamentId}/create/by-wish`,
  TOURNAMENT_ITEM_EDIT: (tournamentId: number, itemId: number) =>
    `/tournament/${tournamentId}/item/${itemId}`,
  TOURNAMENT_LOADING: (tournamentId: number) => `/tournament/${tournamentId}/loading`,
  TOURNAMENT_MATCH: (tournamentId: number) => `/tournament/${tournamentId}/match`,
  TOURNAMENT_RESULT: (tournamentId: number) => `/tournament/${tournamentId}/result`,
} as const;
