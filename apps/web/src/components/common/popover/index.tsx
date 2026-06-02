'use client';

import { Popover as PopoverPrimitive } from 'radix-ui';
import * as React from 'react';

import { Z_INDEX } from '@/consts/zIndex';
import { cn } from '@/utils/cn';

function Popover({ modal = true, ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" modal={modal} {...props} />;
}

function PopoverTrigger({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      className={cn('cursor-pointer', className)}
      {...props}
    />
  );
}

function PopoverPortal({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Portal>) {
  return <PopoverPrimitive.Portal data-slot="popover-portal" {...props} />;
}

function PopoverOverlay({
  className,
  style,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return (
    <PopoverPrimitive.Close
      data-slot="popover-overlay"
      aria-hidden
      className={cn(
        'fixed inset-0 isolate cursor-default border-0 bg-bg-layer-overlay p-0 duration-100 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0',
        className
      )}
      style={{ zIndex: Z_INDEX.POPOVER, ...style }}
      {...props}
    />
  );
}

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  showOverlay = true,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & {
  showOverlay?: boolean;
}) {
  return (
    <>
      {showOverlay ? (
        <PopoverPortal>
          <PopoverOverlay />
        </PopoverPortal>
      ) : null}
      <PopoverPortal>
        <PopoverPrimitive.Content
          data-slot="popover-content"
          align={align}
          sideOffset={sideOffset}
          className={cn(
            'flex origin-(--radix-popover-content-transform-origin) flex-col rounded-2xl bg-bg-layer-default text-text-neutral-primary shadow-[0_1px_8px_0_rgba(0,0,0,0.1)] ring-1 ring-border-neutral-muted outline-hidden duration-100 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
          )}
          style={{ zIndex: Z_INDEX.POPOVER, ...props.style }}
          {...props}
        />
      </PopoverPortal>
    </>
  );
}

function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverClose({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="popover-header" className={cn('flex flex-col', className)} {...props} />;
}

function PopoverTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return <div data-slot="popover-title" className={className} {...props} />;
}

function PopoverDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return <p data-slot="popover-description" className={className} {...props} />;
}

export {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverOverlay,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
};
