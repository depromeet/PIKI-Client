import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

type DividerProps = ComponentPropsWithoutRef<'div'> & {
  length?: string;
  direction?: 'horizontal' | 'vertical';
};

function Divider({
  length = '100%',
  direction = 'horizontal',
  className,
  style,
  ...props
}: DividerProps) {
  const isHorizontal = direction === 'horizontal';

  return (
    <div
      className={cn('shrink-0 bg-gray-100', isHorizontal ? 'h-px' : 'w-px', className)}
      style={{
        [isHorizontal ? 'width' : 'height']: length,
        ...style,
      }}
      {...props}
    />
  );
}

export default Divider;
