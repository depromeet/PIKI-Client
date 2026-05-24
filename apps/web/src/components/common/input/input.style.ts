import { cva } from 'class-variance-authority';

export const inputStyles = cva('flex items-center gap-2 rounded-xl px-4 py-4 transition-colors', {
  variants: {
    status: {
      default:
        'border border-gray-100 bg-white focus-within:border-[1.4px] focus-within:border-blue-500',
      error: 'border-[1.4px] border-red-400 bg-white',
      disabled: 'border border-gray-100 bg-gray-50',
    },
  },
  defaultVariants: {
    status: 'default',
  },
});
