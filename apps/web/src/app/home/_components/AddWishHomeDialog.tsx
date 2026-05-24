'use client';

import { useRouter } from 'next/navigation';
import type { ComponentType, SVGProps } from 'react';
import { useState } from 'react';

import { HeartIconFill, ImageIconFill, LinkIconFill } from '@/assets/icons';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/common/dialog';
import { cn } from '@/utils/cn';

import AddByImageDialog from '../../tournament/create/_components/addByImageDialog/AddByImageDialog';
import AddByLinkDialog from '../../tournament/create/_components/addByLinkDialog/AddByLinkDialog';

type WishOptionT = {
  key: 'link' | 'image';
  label: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const OPTIONS: WishOptionT[] = [
  {
    key: 'link',
    label: '링크로 담기',
    description: '상품URL을 붙여넣어요',
    Icon: LinkIconFill,
  },
  {
    key: 'image',
    label: '이미지로 담기',
    description: '스크린샷을 첨부해요',
    Icon: ImageIconFill,
  },
];

function AddWishHomeDialog() {
  const router = useRouter();
  const [wishOpen, setWishOpen] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  const handleSelect = (key: WishOptionT['key']) => {
    if (key === 'link') {
      setWishOpen(false);
      setLinkOpen(true);
      return;
    }
    if (key === 'image') {
      setWishOpen(false);
      setImageOpen(true);
    }
  };

  const handleLinkSubmit = () => {
    router.push('/wishlist');
  };

  const handleImageSubmit = () => {
    router.push('/wishlist');
  };

  return (
    <>
      <Dialog open={wishOpen} onOpenChange={setWishOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="flex flex-1 flex-col items-center gap-2 rounded-[12px] bg-bg-layer-default p-5"
          >
            <HeartIconFill className="size-8 text-red-400" />
            <span className="body-1-semibold text-text-neutral-primary">위시 담기</span>
          </button>
        </DialogTrigger>
        <DialogContent
          showCloseButton={false}
          className="flex w-[362px] max-w-[calc(100%-40px)] flex-col gap-[15px] rounded-3xl"
        >
          <DialogTitle className="text-center heading-1 text-text-neutral-primary">
            위시템 담기
          </DialogTitle>
          <ul className="flex w-full flex-col gap-2">
            {OPTIONS.map(({ key, label, description, Icon }) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => handleSelect(key)}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-[12px] border border-gray-100 bg-bg-layer-default px-5 pt-4 pb-[15px]',
                    'transition-colors active:bg-gray-50'
                  )}
                >
                  <span className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-gray-50">
                    <Icon className="size-5 text-icon-neutral-primary" />
                  </span>
                  <span className="flex flex-col items-start gap-1">
                    <span className="body-1-semibold text-text-neutral-primary">{label}</span>
                    <span className="body-2-regular text-text-neutral-secondary">
                      {description}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>

      <AddByLinkDialog open={linkOpen} onOpenChange={setLinkOpen} onSubmit={handleLinkSubmit} />
      <AddByImageDialog open={imageOpen} onOpenChange={setImageOpen} onSubmit={handleImageSubmit} />
    </>
  );
}

export default AddWishHomeDialog;
