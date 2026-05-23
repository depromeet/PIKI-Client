'use client';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

import { AlertIconFill, CheckCircledIconFill, WarningIconFill } from '@/assets/icons/fill';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      visibleToasts={1}
      duration={3000}
      theme="light"
      className="toaster group w-full! max-w-[calc(480px-40px)]!"
      icons={{
        success: (
          <CheckCircledIconFill className="size-6 text-icon-success" width={24} height={24} />
        ),
        info: <AlertIconFill className="size-6 text-gray-300" width={24} height={24} />,
        warning: <WarningIconFill className="size-6 text-icon-warning" width={24} height={24} />,
      }}
      style={
        {
          '--normal-bg': 'var(--color-gray-500)',
          '--normal-text': 'var(--color-text-neutral-inverse)',
          '--border-radius': 'var(--radius-xl)',
        } as React.CSSProperties
      }
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast: '!gap-2 !w-full !border-none !bottom-[90px]',
          title: '!body-2-semibold',
          icon: '!size-6 !ml-0 !mr-0',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
