import type {
  ImagePickerCancelMessageT,
  ImagePickerErrorMessageT,
  ImagePickerSuccessMessageT,
  OpenImagePickerMessageT,
} from './image';
import type {
  DeleteFcmTokenMessageT,
  OpenNotificationSettingsMessageT,
  RegisterFcmTokenMessageT,
} from './notification';

export type WebBridgeMessageT =
  | OpenImagePickerMessageT
  | ImagePickerSuccessMessageT
  | ImagePickerCancelMessageT
  | ImagePickerErrorMessageT
  | OpenNotificationSettingsMessageT
  | RegisterFcmTokenMessageT
  | DeleteFcmTokenMessageT;
