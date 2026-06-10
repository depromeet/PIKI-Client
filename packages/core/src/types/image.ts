import type { WEBBRIDGE_MESSAGE_TYPE } from '../consts/webBridge';

/** 웹 → 앱 이미지 피커 오픈 요청 */
export type WebReqOpenImagePickerMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.WEB_REQ_OPEN_IMAGE_PICKER;
  payload: OpenImagePickerPayloadT;
};
export type OpenImagePickerPayloadT = {
  requestId: string;
  maxCount: number;
};

/** 앱 → 웹 이미지 선택 성공 시 */
export type AppResImagePickerSuccessMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.APP_RES_IMAGE_PICKER_SUCCESS;
  payload: ImagePickerSuccessPayloadT;
};
export type ImagePickerSuccessPayloadT = {
  requestId: string;
  images: NativeImagePayloadT[];
  /** 제외된 이미지 개수 */
  skippedCount: number;
};
/** 앱에서 선택한 이미지를 웹으로 넘기기 위한 Base64 payload */
export type NativeImagePayloadT = {
  base64: string;
  mimeType: string;
  fileName: string;
};

/** 앱 → 웹 이미지 선택 취소 시 */
export type AppResImagePickerCancelMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.APP_RES_IMAGE_PICKER_CANCEL;
  payload: ImagePickerRequestPayloadT;
};
export type ImagePickerRequestPayloadT = {
  requestId: string;
};

/** 앱 → 웹 이미지 선택 실패 시 */
export type AppResImagePickerErrorMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.APP_RES_IMAGE_PICKER_ERROR;
  payload: ImagePickerErrorPayloadT;
};
export type ImagePickerErrorPayloadT = {
  requestId: string;
  detail: string;
};
