import { useEffect } from 'react';

/**
 * 페이지 전용 배경색을 body 에 직접 적용한다.
 *
 * iOS 26 Safari 가 `<meta name="theme-color">` 를 무시하면서 노치(safe-area-top)/
 * 홈 인디케이터 영역이 body 의 배경색을 그대로 따라가게 됐다. 페이지마다 배경이 다르면
 * 그 영역도 함께 페이지 색으로 칠해져야 시각적으로 자연스럽다.
 *
 * @param color CSS color value (예: 'var(--color-bg-layer-default)', '#fff')
 */
export const usePageBackground = (color: string) => {
  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = color;
    return () => {
      document.body.style.backgroundColor = previous;
    };
  }, [color]);
};
