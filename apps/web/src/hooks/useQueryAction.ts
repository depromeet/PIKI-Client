'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { QUERY_ACTION, type QueryActionValueT } from '@/consts/queryAction';

type UseQueryActionOptions = {
  /** `action` 쿼리 값 (예: `get-item`) */
  action: QueryActionValueT;
  /** 쿼리 키. 기본값 `action` */
  paramKey?: string;
  /** 실행 후 이동할 경로. 미지정 시 현재 pathname */
  clearPath?: string;
  /** 쿼리 매칭 시 1회 호출 (토스트 등). 다이얼로그는 `isActive` 사용 */
  onAction?: () => void;
};

type UseQueryActionReturn = {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
};

/**
 * `?action=<value>` 로 진입한 뒤 쿼리를 URL에서 제거하고, 액션 상태를 반환합니다.
 * 다이얼로그: `isActive` / `setIsActive`, 토스트 등: `onAction`.
 */
export const useQueryAction = ({
  action,
  paramKey = QUERY_ACTION.KEY,
  clearPath,
  onAction,
}: UseQueryActionOptions): UseQueryActionReturn => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [isActive, setIsActive] = useState(() => searchParams.get(paramKey) === action);

  useEffect(() => {
    if (searchParams.get(paramKey) !== action) return;

    onAction?.();
    router.replace(clearPath ?? pathname, { scroll: false });
  }, [searchParams, paramKey, action, clearPath, pathname, router, onAction]);

  return { isActive, setIsActive };
};
