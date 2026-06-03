import type { ItemTypeT } from '@/types/item';

export const ROUTES = {
  /** §2.1 공통 / 퍼블릭 */
  ROOT: '/',
  HOME: '/home',
  LOGIN: '/login',
  TOURNAMENT_JOIN_BY_CODE: '/tournament/join',
  TOURNAMENT_JOIN_BY_LINK: (id: string) => `/tournament/join/${id}`,

  /** §2.2 보관함 (Member Only) */
  ARCHIVE: '/archive',
  ARCHIVE_WITH_TYPE: (type: ItemTypeT) => `/archive?type=${type}`,
  ARCHIVE_WISH_ID: (wishId: string) => `/archive/wish/${wishId}`,

  /** §2.3 토너먼트 (Authorized Guest or Member) */
  TOURNAMENT_CREATE: (tournamentId: string) => `/tournament/${tournamentId}/create`,
  TOURNAMENT_ADD_ITEM_BY_WISH: (tournamentId: string) =>
    `/tournament/${tournamentId}/create/by-wish`,
  TOURNAMENT_EDIT_ITEM: (tournamentId: string, itemId: string) =>
    `/tournament/${tournamentId}/item/${itemId}`,
  TOURNAMENT_LOADING: (tournamentId: string) => `/tournament/${tournamentId}/loading`,
  TOURNAMENT_MATCH: (tournamentId: string) => `/tournament/${tournamentId}/match`,
  TOURNAMENT_RESULT: (tournamentId: string) => `/tournament/${tournamentId}/result`,
} as const;
