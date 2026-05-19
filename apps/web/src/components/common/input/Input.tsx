import { useId } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/utils/cn';

type InputStatusT = 'default' | 'error' | 'disabled';

type InputProps = {
  label?: string;
  helperText?: string;
  status?: InputStatusT;
  left?: ReactNode;
  right?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'input'>, 'disabled'>;

const inputContainerVariants = cva(
  'flex items-center gap-2 rounded-xl px-4 py-4 transition-colors',
  {
    variants: {
      status: {
        default: 'border border-gray-100 bg-white focus-within:border-[1.4px] focus-within:border-blue-500',
        error: 'border-[1.4px] border-red-400 bg-white',
        disabled: 'border border-gray-100 bg-gray-50',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
);

function Input({ label, helperText, status = 'default', left, right, id, className, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperTextId = `${inputId}-helper`;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="body-2-semibold text-gray-950">
          {label}
        </label>
      )}
      <div className={cn(inputContainerVariants({ status }))}>
        {left && <span className="shrink-0 text-gray-300">{left}</span>}
        <input
          id={inputId}
          disabled={status === 'disabled'}
          aria-invalid={status === 'error'}
          aria-describedby={helperText ? helperTextId : undefined}
          className={cn(
            'body-1-medium w-full overflow-hidden text-ellipsis whitespace-nowrap bg-transparent text-gray-600 outline-none placeholder:text-gray-300 focus:text-gray-900 disabled:text-gray-300',
            className
          )}
          {...props}
        />
        {right && <span className="shrink-0 text-gray-300">{right}</span>}
      </div>
      {helperText && (
        <p id={helperTextId} className={cn('body-2-regular', status === 'error' ? 'text-red-600' : 'text-gray-300')}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Input;
