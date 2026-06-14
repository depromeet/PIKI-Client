import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/utils/queryClient';

import { getNotifications } from './_apis/getNotifications';
import NotificationContent from './_components/NotificationContent';

async function Notification() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam }) => getNotifications({ cursor: pageParam as string | undefined }),
    initialPageParam: undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotificationContent />
    </HydrationBoundary>
  );
}

export default Notification;
