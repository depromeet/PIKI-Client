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

export type WebBridgeMessageT =
  | OpenImagePickerMessageT
  | ImagePickerSuccessMessageT
  | ImagePickerCancelMessageT
  | ImagePickerErrorMessageT
  | RequestSocialLoginMessageT
  | SocialLoginSuccessMessageT
  | SocialLoginErrorMessageT;
