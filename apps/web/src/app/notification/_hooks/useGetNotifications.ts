import { useInfiniteQuery } from '@tanstack/react-query';

import { getNotifications } from '../_apis/getNotifications';

export const useGetNotifications = () => {
  const {
    data: notificationsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam }) => getNotifications({ cursor: pageParam }),
    initialPageParam: null as string | null,
    getNextPageParam: lastPage => (lastPage.hasNext ? (lastPage.nextCursor ?? null) : null),
  });

  const notifications = notificationsData?.pages.flatMap(page => page.items) ?? [];
  const unreadCount = notificationsData?.pages[0]?.unreadCount ?? 0;

  return { notificationsData: notifications, unreadCount, fetchNextPage, hasNextPage, isFetchingNextPage, isPending };
};
