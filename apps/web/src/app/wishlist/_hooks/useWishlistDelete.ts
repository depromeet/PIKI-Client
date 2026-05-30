import { useState } from 'react';
import { toast } from 'sonner';

import { useDeleteWish } from '@/hooks/useDeleteWish';

export const useWishlistDelete = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const { mutateAsync: deleteWishMutation } = useDeleteWish();

  const handleEnterDeleteMode = () => {
    setIsDeleteMode(true);
    setSelectedIds(new Set());
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // TODO: 다중 삭제 API 구현 후 부분 성공/실패 처리 추가
  const handleConfirmDelete = async () => {
    if (selectedIds.size === 0) return;
    try {
      await Promise.all([...selectedIds].map(id => deleteWishMutation(id)));
      toast.success('선택한 위시를 삭제했어요');
    } finally {
      setSelectedIds(new Set());
      setIsDeleteMode(false);
    }
  };

  return {
    isDeleteMode,
    selectedIds,
    handleEnterDeleteMode,
    handleToggleSelect,
    handleConfirmDelete,
  };
};
