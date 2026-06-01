'use client';

import { useRouter } from 'next/navigation';

import WarningIconFill from '@/assets/icons/outline/warning.svg';
import Button from '@/components/common/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/common/dialog';

type TournamentItemFailedModalProps = {
  open: boolean;
  onClose: () => void;
};

function TournamentItemFailedModal({ open, onClose }: TournamentItemFailedModalProps) {
  const router = useRouter();

  const handleManualInput = () => {
    onClose();
    router.push('/item/manual');
  };

  return (
    <Dialog open={open} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent showCloseButton={false} className="text-center">
        <div className="flex justify-center">
          <div style={{ width: 48, height: 48 }}>
            <WarningIconFill width="100%" height="100%" className="text-red-300" aria-hidden />
          </div>
        </div>
        <DialogHeader className="mt-4 gap-1">
          <DialogTitle className="heading-1">상품 정보를 가져오지 못했어요</DialogTitle>
          <p className="body-1-medium text-text-neutral-tertiary">서버에서 문제가 발생했어요</p>
        </DialogHeader>
        <DialogFooter className="mt-6 flex-row gap-3">
          <Button variant="secondary" size="lg" className="flex-1" onClick={onClose}>
            삭제하기
          </Button>
          <Button variant="primary" size="lg" className="flex-1" onClick={handleManualInput}>
            직접 입력하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TournamentItemFailedModal;
