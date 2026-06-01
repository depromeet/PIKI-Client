'use client';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

import { AlertIconFill, CheckCircledIconFill, WarningIconFill } from '@/assets/icons/fill';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      visibleToasts={1}
      duration={3000}
      theme="light"
      className="toaster group"
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
          '--width': 'min(100%, 440px)',
        } as React.CSSProperties
      }
      position="bottom-center"
      mobileOffset={{
        bottom: '90px',
        left: '20px',
        right: '20px',
      }}
      toastOptions={{
        classNames: {
          toast: '!gap-2 !border-none',
          title: '!body-2-semibold',
          icon: '!size-6 !ml-0 !mr-0',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
