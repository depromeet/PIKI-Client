'use client';

import { useEffect } from 'react';

/**
 * 페이지의 노치/safe-area 영역 색상을 동적으로 변경합니다.
 *
 * iOS Safari는 버전/스크롤 위치/페이지 전환 등에 따라 themeColor 적용이
 * 불안정한 경우가 많아, 다음 3가지를 동시에 처리합니다:
 *  1. <meta name="theme-color"> 강제 재생성 (caching/staleness 회피)
 *  2. <html> 배경색 직접 갱신 (Safari가 노치 영역에서 참조)
 *  3. cleanup으로 이전 값 복원
 */
export const useThemeColor = (color: string) => {
  useEffect(() => {
    const html = document.documentElement;
    const previousBg = html.style.backgroundColor;

    const oldMeta = document.head.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const previousContent = oldMeta?.getAttribute('content') ?? null;
    if (oldMeta) oldMeta.remove();

    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('content', color);
    document.head.appendChild(meta);

    html.style.backgroundColor = color;

    return () => {
      meta.remove();
      if (previousContent !== null) {
        const restored = document.createElement('meta');
        restored.setAttribute('name', 'theme-color');
        restored.setAttribute('content', previousContent);
        document.head.appendChild(restored);
      }
      html.style.backgroundColor = previousBg;
    };
  }, [color]);
};
