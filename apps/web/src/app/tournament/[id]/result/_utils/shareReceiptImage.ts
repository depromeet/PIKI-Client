import { toBlob } from 'html-to-image';

const FILE_NAME = 'piki-receipt.png';
const MIME = 'image/png';

const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => reject(new Error('TIMEOUT')), ms);
    promise.then(
      value => {
        window.clearTimeout(timeoutId);
        resolve(value);
      },
      error => {
        window.clearTimeout(timeoutId);
        reject(error);
      }
    );
  });

/**
 * 영수증 DOM 을 PNG 로 캡처하고, Web Share API 가 가능하면 네이티브 공유 시트를 띄우고,
 * 그렇지 않으면 다운로드로 fallback.
 *
 * `html-to-image` 사용 — `html2canvas` 가 Tailwind v4 의 `lab()`/`oklch()` 컬러를 파싱하지 못해
 * 모던 CSS 컬러 스페이스를 지원하는 라이브러리로 교체.
 *
 * @returns 공유/다운로드가 일어났으면 true, 사용자가 취소했거나 캡처 자체가 실패하면 false
 */
export const shareReceiptImage = async (element: HTMLElement): Promise<boolean> => {
  // 외부 폰트(Kode Mono) 가 다 로드된 후 캡처해야 변형 없이 동일.
  if (typeof document !== 'undefined' && 'fonts' in document) {
    await withTimeout(document.fonts.ready, 3_000).catch(() => null);
  }

  // 이미지들도 다 로드된 후 캡처 — 각각 최대 3초 대기.
  await Promise.all(
    [...element.querySelectorAll('img')].map(img => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return withTimeout(
        new Promise(resolve => {
          img.addEventListener('load', () => resolve(null), { once: true });
          img.addEventListener('error', () => resolve(null), { once: true });
        }),
        3_000
      ).catch(() => null);
    })
  );

  const pixelRatio = typeof window !== 'undefined' ? Math.max(window.devicePixelRatio || 2, 2) : 2;
  const blob = await toBlob(element, {
    pixelRatio,
    cacheBust: true,
    backgroundColor: '#ffffff',
  });
  if (!blob) throw new Error('영수증 이미지 변환 실패');

  const file = new File([blob], FILE_NAME, { type: MIME });

  // Web Share API + 파일 공유 가능한 환경 (모바일 사파리/크롬) — 네이티브 공유 시트
  if (
    typeof navigator !== 'undefined' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files: [file] })
  ) {
    try {
      await navigator.share({ files: [file] });
      return true;
    } catch (error) {
      // 사용자가 공유 시트 닫음 — 정상 흐름
      if (error instanceof DOMException && error.name === 'AbortError') return false;
      // 그 외 실패 시 다운로드로 fallback
    }
  }

  downloadBlob(blob, FILE_NAME);
  return true;
};
