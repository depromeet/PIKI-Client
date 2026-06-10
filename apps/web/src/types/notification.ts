export type NotificationTypeT =
  | 'TOURNAMENT_JOINED'
  | 'TOURNAMENT_ITEM_ADDED'
  | 'ITEM_PARSING_COMPLETED'
  | 'ITEM_PARSING_FAILED';

export type NotificationKindT = 'WISH' | 'TOURNAMENT';

export type NotificationSsePayloadT = {
  id: number;
  type: NotificationTypeT;
  category: string;
  title: string;
  body: string;
  imageUrl: string;
  refId: number;
  isRead: boolean;
  createdAt: string;
  /** ITEM_PARSING_COMPLETED / ITEM_PARSING_FAILED 일 때만 존재 */
  kind?: NotificationKindT;
  /** kind === 'TOURNAMENT' 일 때만 존재 */
  tournamentId?: number;
  /** kind === 'TOURNAMENT' 일 때만 존재 */
  tournamentItemId?: number;
};
