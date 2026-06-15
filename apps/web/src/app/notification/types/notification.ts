export type NotificationTypeT =
  | 'TOURNAMENT_JOINED'
  | 'TOURNAMENT_ITEM_ADDED'
  | 'TOURNAMENT_STARTED'
  | 'TOURNAMENT_PLAYED_FROM_LINK'
  | 'TOURNAMENT_COMPLETED'
  | 'TOURNAMENT_RESULT_READY'
  | 'ITEM_PARSING_COMPLETED'
  | 'ITEM_PARSING_FAILED'
  | 'ANNOUNCEMENT';

export type NotificationCategoryT = 'ACTIVITY' | 'SYSTEM';

export type NotificationItemT = {
  id: number;
  type: NotificationTypeT;
  category: NotificationCategoryT;
  title: string;
  body: string;
  imageUrl: string;
  refId: number;
  isRead: boolean;
  createdAt: string;
  kind?: 'WISH' | 'TOURNAMENT';
  tournamentId?: number;
  tournamentItemId?: number;
};

export type NotificationListDataT = {
  items: NotificationItemT[];
  unreadCount: number;
  unreadCountByCategory: Record<NotificationCategoryT, number>;
};
