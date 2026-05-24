'use client';

import { HeartIconFill } from '@/assets/icons';
import { Dialog, DialogTrigger } from '@/components/common/dialog';
import GetItemDialogContent from '@/components/common/get-item-dialog';

function AddWishHomeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-[12px] bg-bg-layer-default p-5"
        >
          <HeartIconFill className="size-8 text-red-400" />
          <span className="body-1-semibold text-text-neutral-primary">위시 담기</span>
        </button>
      </DialogTrigger>
      <GetItemDialogContent type="wish" />
    </Dialog>
  );
}

export default AddWishHomeDialog;
