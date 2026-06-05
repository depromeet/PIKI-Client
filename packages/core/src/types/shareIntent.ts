/**
 * NOTE:
 * `expo-share-intent`에 정의된 타입들과 동일한 필드
 * 웹이 expo 패키지에 의존하지 않도록 core에 별도 정의함
 */
import type { WEBBRIDGE_MESSAGE_TYPE } from '../consts/webBridge';

export type ShareIntentFileT = {
  fileName: string;
  mimeType: string;
  path: string;
  size: number | null;
  width: number | null;
  height: number | null;
  duration: number | null;
};

export type ShareIntentMetaT = Record<string, string | undefined> & {
  title?: string;
};

export type ShareIntentMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.SHARE_INTENT;
  payload: ShareIntentPayloadT;
};
export type ShareIntentPayloadT = {
  meta?: ShareIntentMetaT | null;
  text?: string | null;
  files: ShareIntentFileT[] | null;
  type: 'media' | 'file' | 'text' | 'weburl' | null;
  webUrl: string | null;
};
