import Skeleton from '@/components/common/skeleton';

function WishlistSkeleton() {
  return (
    <main className="flex flex-1 flex-col px-5 pb-24">
      <div className="grid grid-cols-2 gap-x-2 gap-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-2xl bg-white">
            <Skeleton className="h-[143px] w-full" />
            <div className="flex flex-col items-center gap-[9px] px-3 py-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default WishlistSkeleton;
