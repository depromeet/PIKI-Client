import type { WEBBRIDGE_MESSAGE_TYPE, WEB_READY_MESSAGE_TYPE } from '../consts/webBridge';
import type {
  ImagePickerCancelMessageT,
  ImagePickerErrorMessageT,
  ImagePickerSuccessMessageT,
  OpenImagePickerMessageT,
} from './image';
import type {
  RequestSocialLoginMessageT,
  SocialLoginErrorMessageT,
  SocialLoginSuccessMessageT,
} from './login';
import type {
  AppResFcmTokenMessageT,
  AppResPushPermissionStatusMessageT,
  WebReqOpenNotificationSettingsMessageT,
  WebReqPushPermissionMessageT,
  WebReqPushPermissionStatusMessageT,
} from './pushNotification';
import type { ShareIntentMessageT } from './shareIntent';

export type WebBridgeMessageT =
  | OpenImagePickerMessageT
  | ImagePickerSuccessMessageT
  | ImagePickerCancelMessageT
  | ImagePickerErrorMessageT
  | RequestSocialLoginMessageT
  | SocialLoginSuccessMessageT
  | SocialLoginErrorMessageT
  | ShareIntentMessageT
  | WebReadyMessageT
  | WebReqPushPermissionStatusMessageT
  | WebReqPushPermissionMessageT
  | WebReqOpenNotificationSettingsMessageT
  | AppResPushPermissionStatusMessageT
  | AppResFcmTokenMessageT;

export type WebReadyMessageT = {
  type: typeof WEBBRIDGE_MESSAGE_TYPE.WEB_READY;
  payload: {
    type: typeof WEB_READY_MESSAGE_TYPE.SHARE_INTENT;
  };
};
