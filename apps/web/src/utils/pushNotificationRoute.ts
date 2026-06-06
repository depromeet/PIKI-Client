import { PUSH_NOTIFICATION_TYPE, type PushNotificationTypeT } from '@piki/core';

import { ROUTES } from '@/consts/route';

export const getPushNotificationRoute = (type: PushNotificationTypeT, refId: number) => {
  switch (type) {
    case PUSH_NOTIFICATION_TYPE.TOURNAMENT_JOINED:
    case PUSH_NOTIFICATION_TYPE.TOURNAMENT_ITEM_ADDED:
      return ROUTES.TOURNAMENT_CREATE(refId);
    case PUSH_NOTIFICATION_TYPE.ITEM_PARSING_COMPLETED:
    case PUSH_NOTIFICATION_TYPE.ITEM_PARSING_FAILED:
      return ROUTES.ARCHIVE();
  }
};
