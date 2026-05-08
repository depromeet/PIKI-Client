'use client';

import { useEffect } from 'react';

/**
 * 페이지의 theme-color 메타 태그를 동적으로 변경합니다.
 * iOS Safari에서 viewport export 머지가 일부 환경에서 정상 적용되지 않는
 * 케이스를 보완하기 위해 클라이언트에서 직접 메타 태그를 갱신합니다.
 */
export const useThemeColor = (color: string) => {
  useEffect(() => {
    const selector = 'meta[name="theme-color"]';
    let meta = document.querySelector<HTMLMetaElement>(selector);

    const previous = meta?.getAttribute('content') ?? null;

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', color);

    return () => {
      if (!meta) return;
      if (previous === null) {
        meta.remove();
        return;
      }
      meta.setAttribute('content', previous);
    };
  }, [color]);
};
