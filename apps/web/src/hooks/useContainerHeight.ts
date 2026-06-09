'use client';

import { useCallback, useRef, useState } from 'react';

const useContainerHeight = () => {
  const [height, setHeight] = useState<number>();
  const observerRef = useRef<ResizeObserver | null>(null);

  const ref = useCallback((el: HTMLDivElement | null) => {
    observerRef.current?.disconnect();

    if (!el) return;

    observerRef.current = new ResizeObserver(() => setHeight(el.clientHeight));
    observerRef.current.observe(el);
  }, []);

  return { ref, height };
};

export default useContainerHeight;
