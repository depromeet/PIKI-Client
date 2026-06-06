import type { ShareIntentFileT, ShareIntentPayloadT } from '@piki/core';
import type { ShareIntent, ShareIntentFile } from 'expo-share-intent';

/**
 * NOTE:
 * app에서는 `expo-share-intent` 타입을 직접 사용할 수 있지만,
 * web에서는 해당 타입을 사용할 수 없다.
 * 그래서 WebView 브리지 경계에서는 `@piki/core`의 공용 payload 타입으로 변환한다.
 */

const toShareIntentFile = (file: ShareIntentFile): ShareIntentFileT => ({
  fileName: file.fileName,
  mimeType: file.mimeType,
  path: file.path,
  size: file.size,
  width: file.width,
  height: file.height,
  duration: file.duration,
});

export const toShareIntentPayload = (shareIntent: ShareIntent): ShareIntentPayloadT => ({
  meta: shareIntent.meta ?? null,
  text: shareIntent.text ?? null,
  files: shareIntent.files ? shareIntent.files.map(toShareIntentFile) : null,
  type: shareIntent.type,
  webUrl: shareIntent.webUrl,
});
