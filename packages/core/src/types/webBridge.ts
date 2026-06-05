import type { WEBBRIDGE_MESSAGE_TYPE, WEB_READY_MESSAGE_TYPE } from '../consts/webBridge';
import type {
  ImagePickerCancelMessageT,
  ImagePickerErrorMessageT,
  ImagePickerSuccessMessageT,
  OpenImagePickerMessageT,
} from './image';
import type { ShareIntentMessageT } from './shareIntent';

export type WebBridgeMessageT =
  | OpenImagePickerMessageT
  | ImagePickerSuccessMessageT
  | ImagePickerCancelMessageT
  | ImagePickerErrorMessageT
  | ShareIntentMessageT
  | WebReadyMessageT;

/** 웹이 페이지 hydrate 완료 후 RN에게 메시지 수신 준비됨을 알리는 메시지 */
export type WebReadyMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.WEB_READY;
  payload: {
    type: typeof WEB_READY_MESSAGE_TYPE.SHARE_INTENT;
  };
};
