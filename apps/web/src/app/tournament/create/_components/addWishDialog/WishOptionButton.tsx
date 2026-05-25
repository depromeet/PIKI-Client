import type { ComponentType, SVGProps } from 'react';

import { cn } from '@/utils/cn';

type WishOptionButtonProps = {
  label: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  onClick: () => void;
};

function WishOptionButton({ label, description, Icon, onClick }: WishOptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-4 rounded-[12px] border border-gray-100 bg-bg-layer-default px-5 pt-4 pb-[15px]',
        'transition-colors active:bg-gray-50'
      )}
    >
      <span className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-gray-50">
        <Icon className="size-6 text-icon-neutral-primary" />
      </span>
      <span className="flex flex-col items-start gap-1">
        <span className="body-1-semibold text-text-neutral-primary">{label}</span>
        <span className="body-2-regular text-text-neutral-secondary">{description}</span>
      </span>
    </button>
  );
}

export default WishOptionButton;
