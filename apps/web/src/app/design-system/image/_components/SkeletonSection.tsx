'use client';

import Skeleton from '@/components/common/Skeleton/Skeleton';

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
                width={shape === 'circle' ? '64px' : '100%'}
                height="64px"
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
            <Skeleton shape="circle" width="48px" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton height="16px" width="60%" />
              <Skeleton height="14px" width="40%" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Skeleton height="120px" />
            <Skeleton height="120px" />
            <Skeleton height="120px" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkeletonSection;
