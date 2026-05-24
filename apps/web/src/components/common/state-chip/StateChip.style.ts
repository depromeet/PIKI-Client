import { type VariantProps, cva } from 'class-variance-authority';

export const stateChipStyles = cva(
  'inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1 caption-1-semibold',
  {
    variants: {
      state: {
        adding: 'bg-yellow-50 text-yellow-700',
        playing: 'bg-green-50 text-green-700',
        done: 'bg-blue-50 text-blue-700',
      },
    },
    defaultVariants: {
      state: 'adding',
    },
  }
);

export type StateChipStyleProps = VariantProps<typeof stateChipStyles>;
