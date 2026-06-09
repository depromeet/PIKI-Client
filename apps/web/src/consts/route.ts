import type { ItemTypeT } from '@/types/item';

export const ROUTES = {
  /** 1. Public */
  ROOT: '/',
  HOME: '/home',
  LOGIN: '/login',
  TOURNAMENT_JOIN_BY_CODE: '/tournament/join',
  TOURNAMENT_JOIN_BY_LINK: (id: number) => `/tournament/join/${id}`,
  NOTIFICATION: '/notification',

  /** 2. Member Only */
  ARCHIVE_BASE: '/archive',
  ARCHIVE: (tab: ItemTypeT = 'wish') => `/archive?tab=${tab}`,
  WISH_EDIT: (wishId: number) => `/archive/wish/${wishId}`,

  /** 3. Authorized Guest or Member */
  TOURNAMENT_CREATE: (tournamentId: number) => `/tournament/${tournamentId}/create`,
  TOURNAMENT_ADD_ITEM_BY_WISH: (tournamentId: number) =>
    `/tournament/${tournamentId}/create/by-wish`,
  TOURNAMENT_ITEM_EDIT: (tournamentId: number, itemId: number) =>
    `/tournament/${tournamentId}/item/${itemId}`,
  TOURNAMENT_LOADING: (tournamentId: number) => `/tournament/${tournamentId}/loading`,
  TOURNAMENT_MATCH: (tournamentId: number) => `/tournament/${tournamentId}/match`,
  TOURNAMENT_RESULT: (tournamentId: number) => `/tournament/${tournamentId}/result`,
} as const;
