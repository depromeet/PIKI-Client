import html2canvas from 'html2canvas';

const FILE_NAME = 'piki-receipt.png';
const MIME = 'image/png';

/** 캡처용 영수증 고정 폭 (시안 기준). 화면 크기에 무관하게 일정한 결과 보장. */
const CAPTURE_WIDTH_PX = 360;

const dataUrlToBlob = (dataUrl: string): Blob => {
  const commaIndex = dataUrl.indexOf(',');
  const header = dataUrl.slice(0, commaIndex);
  const base64 = dataUrl.slice(commaIndex + 1);
  const mime = header.match(/data:(.*?);/)?.[1] ?? MIME;
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
};

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

/**
 * 원본 영수증 DOM 을 cloneNode 한 뒤 off-screen 컨테이너에서 고정 폭으로 렌더링.
 * 원본은 부모의 `w-[74%]` / 마스크 / transform 등의 영향을 받아 캡처 시 폭이 흔들리고
 * `truncate` 같은 오버플로우 처리가 다르게 잡힌다. clone 으로 옮기면 그 모든 컨텍스트에서 분리된다.
 */
const renderInOffscreen = (
  source: HTMLElement
): { container: HTMLDivElement; cleanup: () => void } => {
  const container = document.createElement('div');
  container.setAttribute('aria-hidden', 'true');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '-99999px';
  container.style.width = `${CAPTURE_WIDTH_PX}px`;
  container.style.padding = '12px'; // 트로피 등 박스 밖 요소 잘림 방지
  container.style.pointerEvents = 'none';
  container.style.zIndex = '-1';

  const clone = source.cloneNode(true) as HTMLElement;
  // 원본의 인라인 transform(gsap) 이 캡처 결과를 어긋나게 한다.
  clone.style.transform = 'none';
  clone.style.width = `${CAPTURE_WIDTH_PX}px`;
  clone.style.willChange = 'auto';

  container.appendChild(clone);
  document.body.appendChild(container);

  return {
    container: clone as HTMLDivElement,
    cleanup: () => {
      if (container.parentNode) container.parentNode.removeChild(container);
    },
  };
};

/**
 * DOM 요소를 PNG 로 캡처하고, Web Share API 가 가능하면 네이티브 공유 시트를 띄우고,
 * 그렇지 않으면 다운로드로 fallback.
 *
 * @returns 공유/다운로드가 일어났으면 true, 사용자가 취소했거나 캡처 자체가 실패하면 false
 */
export const shareReceiptImage = async (element: HTMLElement): Promise<boolean> => {
  // 외부 폰트(Kode Mono) 가 다 로드된 후 캡처해야 변형 없이 동일.
  if (typeof document !== 'undefined' && 'fonts' in document) {
    await document.fonts.ready;
  }

  // 원본 element 의 transform/mask 영향을 피하려고 clone 후 off-screen 에서 캡처.
  const { container, cleanup } = renderInOffscreen(element);

  // clone 의 img 들도 새로 fetch 됐을 수 있으니 한 번 더 대기.
  await Promise.all(
    [...container.querySelectorAll('img')].map(img =>
      img.complete && img.naturalWidth > 0
        ? Promise.resolve()
        : new Promise(resolve => {
            img.addEventListener('load', () => resolve(null), { once: true });
            img.addEventListener('error', () => resolve(null), { once: true });
          })
    )
  );

  // 고해상도 캡처
  const scale = typeof window !== 'undefined' ? Math.max(window.devicePixelRatio || 2, 2) : 2;
  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(container, {
      backgroundColor: null,
      scale,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: container.offsetWidth,
      height: container.offsetHeight,
    });
  } finally {
    cleanup();
  }

  const dataUrl = canvas.toDataURL(MIME);
  const blob = dataUrlToBlob(dataUrl);
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
