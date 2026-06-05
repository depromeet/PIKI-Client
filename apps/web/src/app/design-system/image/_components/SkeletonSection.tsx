'use client';

import Skeleton from '@/components/skeleton';

import DemoCard from './DemoCard';

const SKELETON_CASES: {
  label: string;
  variant: 'highlight' | 'default';
  shape: 'square' | 'circle';
}[] = [
  { label: 'highlight + square', variant: 'highlight', shape: 'square' },
  { label: 'default + square', variant: 'default', shape: 'square' },
  { label: 'highlight + circle', variant: 'highlight', shape: 'circle' },
  { label: 'default + circle', variant: 'default', shape: 'circle' },
];

function SkeletonSection() {
  return (
    <section className="flex flex-col gap-10">
      <h2 className="text-[20px] leading-[1.334] font-bold tracking-[-0.45px] text-black sm:text-[24px] sm:tracking-[-0.552px]">
        Skeleton
      </h2>

      <div className="flex flex-col gap-6">
        <h3 className="text-[18px] leading-[1.334] font-bold tracking-[-0.45px] text-black">
          variant × shape
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SKELETON_CASES.map(({ label, variant, shape }) => (
            <DemoCard key={label} label={label}>
              <Skeleton
                variant={variant}
                shape={shape}
                className={shape === 'circle' ? 'size-16' : 'h-16 w-full'}
              />
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="text-[18px] leading-[1.334] font-bold tracking-[-0.45px] text-black">
          실제 UI 맥락 예시
        </h3>
        <div className="rounded-2xl border border-[rgba(112,115,124,0.22)] p-6">
          <div className="flex items-center gap-4">
            <Skeleton shape="circle" className="size-12" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-[14px] w-[40%]" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Skeleton className="h-[120px]" />
            <Skeleton className="h-[120px]" />
            <Skeleton className="h-[120px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkeletonSection;
