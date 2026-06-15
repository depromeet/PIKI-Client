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

/** 트로피 뱃지가 영수증 종이 좌상단으로 8px 나가고, 종이 자체 그림자도 있어서 여유를 둔다. */
const CAPTURE_PADDING_PX = 40;

/**
 * 원본 영수증 DOM 을 cloneNode 한 뒤 off-screen 컨테이너에서 고정 폭으로 렌더링.
 * 원본은 부모의 `w-[74%]` / 마스크 / transform 등의 영향을 받아 캡처 시 폭이 흔들리고
 * `truncate` 같은 오버플로우 처리가 다르게 잡힌다. clone 으로 옮기면 그 모든 컨텍스트에서 분리된다.
 */
const renderInOffscreen = (
  source: HTMLElement
): { capture: HTMLDivElement; cleanup: () => void } => {
  // 캡처 대상이 될 outer wrapper — 영수증 종이 좌·상·우로 padding 을 두어
  // 트로피 뱃지, 그림자가 잘리지 않도록 한다.
  const capture = document.createElement('div');
  capture.setAttribute('aria-hidden', 'true');
  capture.style.position = 'fixed';
  capture.style.top = '0';
  capture.style.left = '-99999px';
  capture.style.width = `${CAPTURE_WIDTH_PX + CAPTURE_PADDING_PX * 2}px`;
  capture.style.padding = `${CAPTURE_PADDING_PX}px`;
  capture.style.boxSizing = 'border-box';
  capture.style.pointerEvents = 'none';
  capture.style.zIndex = '-1';
  capture.style.backgroundColor = '#ffffff';

  const clone = source.cloneNode(true) as HTMLElement;
  // 원본의 인라인 transform(gsap) 이 캡처 결과를 어긋나게 한다.
  clone.style.transform = 'none';
  clone.style.width = `${CAPTURE_WIDTH_PX}px`;
  clone.style.willChange = 'auto';
  // 트로피 뱃지(`-top-2 -left-2`)가 영수증 좌상단 밖으로 살짝 나가는데, wrapper 의
  // `filter: drop-shadow(...)` 가 새 containing block 을 만들어 자식 absolute 가
  // wrapper bounding box 안에 클립되는 부수효과가 있다. 캡처에선 흰 wrapper 가
  // 배경 역할을 하므로 그림자를 제거해 트로피 잘림을 방지한다.
  clone.style.overflow = 'visible';
  clone.style.clipPath = 'none';
  clone.style.filter = 'none';

  // 영수증 상단의 흰색 그라데이션 오버레이는 원본 화면에서 프린터 슬롯 위 영역을 가려주는
  // 장식 (`absolute -top-6`). 캡처에선 wrapper 의 흰 배경이 그 역할을 하니 제거해서
  // 좌표 계산 어긋남으로 인한 절취선 침범을 방지한다.
  clone.querySelectorAll('[aria-hidden]').forEach(node => {
    const el = node as HTMLElement;
    const cls = el.className?.toString?.() ?? '';
    if (cls.includes('-top-6') && cls.includes('bg-linear-to-t')) {
      el.remove();
    }
  });

  // html2canvas 가 트로피 부모(.relative.size-15) 의 bounding box 밖(`-6px`) 은
  // 잘라낸다. 부모 박스 자체에 음수 margin 으로 좌상단을 키워서 trophy 가 박스 안에
  // 들어가게 하면 잘림 없이 시안의 박스 모서리 걸침 효과가 보존된다.
  clone.querySelectorAll<HTMLElement>('[aria-label="1위"]').forEach(badge => {
    const slot = badge.parentElement;
    if (!slot) return;
    // 부모 박스를 좌상단으로 확장 (음수 margin) + padding 으로 안쪽 이미지는 그대로.
    slot.style.marginTop = '-10px';
    slot.style.marginLeft = '-10px';
    slot.style.paddingTop = '10px';
    slot.style.paddingLeft = '10px';
    slot.style.boxSizing = 'content-box';
    // trophy 는 박스 좌상단(0,0)
    badge.style.position = 'absolute';
    badge.style.top = '0px';
    badge.style.left = '0px';
    badge.style.right = 'auto';
    badge.style.bottom = 'auto';
    badge.style.zIndex = '9999';
  });

  capture.appendChild(clone);
  document.body.appendChild(capture);

  return {
    capture,
    cleanup: () => {
      if (capture.parentNode) capture.parentNode.removeChild(capture);
    },
  };
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
 * DOM 요소를 PNG 로 캡처하고, Web Share API 가 가능하면 네이티브 공유 시트를 띄우고,
 * 그렇지 않으면 다운로드로 fallback.
 *
 * @returns 공유/다운로드가 일어났으면 true, 사용자가 취소했거나 캡처 자체가 실패하면 false
 */
export const shareReceiptImage = async (element: HTMLElement): Promise<boolean> => {
  // 외부 폰트(Kode Mono) 가 다 로드된 후 캡처해야 변형 없이 동일.
  // fonts.ready 가 안 끝나는 일은 거의 없지만 무한 대기 방지로 타임아웃.
  if (typeof document !== 'undefined' && 'fonts' in document) {
    await withTimeout(document.fonts.ready, 3_000).catch(() => null);
  }

  // 원본 element 의 transform/mask 영향을 피하려고 clone 후 off-screen 에서 캡처.
  const { capture, cleanup } = renderInOffscreen(element);

  // clone 의 img 들이 새로 fetch 시작될 수 있다 → 각각 최대 3초 대기 후 그냥 진행.
  await Promise.all(
    [...capture.querySelectorAll('img')].map(img => {
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

  // 고해상도 캡처
  const scale = typeof window !== 'undefined' ? Math.max(window.devicePixelRatio || 2, 2) : 2;
  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(capture, {
      backgroundColor: '#ffffff',
      scale,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: capture.offsetWidth,
      height: capture.offsetHeight,
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
