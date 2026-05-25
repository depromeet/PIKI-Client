'use client';

import { Dialog } from '@/components/common/dialog';
import GetItemDialogContent from '@/components/common/get-item-dialog';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function WishAddDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <GetItemDialogContent type="wish" />
    </Dialog>
  );
}

export default WishAddDialog;
