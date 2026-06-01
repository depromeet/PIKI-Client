import { Z_INDEX } from '@/consts/zIndex';
import { cn } from '@/utils/cn';

type BottomCtaProps = {
  className?: string;
  children: React.ReactNode;
};

function BottomCta({ className, children }: BottomCtaProps) {
  return (
    <div
      className={cn(
        'fixed right-0 bottom-0 left-0 mx-auto flex w-full max-w-120 items-center gap-2.5 px-5 pt-3 pb-5',
        className
      )}
      style={{ zIndex: Z_INDEX.BOTTOM_CTA }}
    >
      {children}
    </div>
  );
}

export default BottomCta;
