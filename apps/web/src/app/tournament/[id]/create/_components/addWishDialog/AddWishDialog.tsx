'use client';

import type { ReactNode } from 'react';

import { Dialog, DialogTrigger } from '@/components/common/dialog';
import GetItemDialogContent from '@/components/common/get-item-dialog';

type AddWishDialogProps = {
  trigger: ReactNode;
};

function AddWishDialog({ trigger }: AddWishDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <GetItemDialogContent type="tournament" />
    </Dialog>
  );
}

export default AddWishDialog;
