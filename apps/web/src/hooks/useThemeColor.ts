'use client';

import { useEffect } from 'react';

/**
 * 페이지의 노치/safe-area 영역 색상을 동적으로 변경합니다.
 *
 * iOS 26 Safari는 themeColor를 무시하므로, html/body 배경색을 직접 갱신해
 * Safari가 노치 영역에서 참조하는 색상을 제어합니다.
 *
 * 페이지 전환 시 cleanup으로 이전 값을 복원합니다.
 */
export const useThemeColor = (color: string) => {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlBg = html.style.backgroundColor;
    const previousBodyBg = body.style.backgroundColor;

    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const previousContent = meta?.getAttribute('content') ?? null;

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', color);
    html.style.backgroundColor = color;
    body.style.backgroundColor = color;

    return () => {
      html.style.backgroundColor = previousHtmlBg;
      body.style.backgroundColor = previousBodyBg;

      const currentMeta = document.head.querySelector<HTMLMetaElement>(
        'meta[name="theme-color"]'
      );
      if (currentMeta && previousContent !== null) {
        currentMeta.setAttribute('content', previousContent);
      }
    };
  }, [color]);
};
