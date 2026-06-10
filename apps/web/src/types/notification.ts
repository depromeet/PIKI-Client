export type NotificationTypeT =
  | 'TOURNAMENT_JOINED'
  | 'TOURNAMENT_ITEM_ADDED'
  | 'ITEM_PARSING_COMPLETED'
  | 'ITEM_PARSING_FAILED';

export type NotificationKindT = 'WISH' | 'TOURNAMENT';

export type NotificationSsePayloadT = {
  id: number;
  type: NotificationTypeT;
  title: string;
  body: string;
  refId: number;
  createdAt: string;
  read: boolean;
  /** ITEM_PARSING_COMPLETED / ITEM_PARSING_FAILED 일 때만 존재 */
  kind?: NotificationKindT;
  /** kind === 'TOURNAMENT' 일 때만 존재 */
  tournamentId?: number;
  /** kind === 'TOURNAMENT' 일 때만 존재 */
  tournamentItemId?: number;
};
