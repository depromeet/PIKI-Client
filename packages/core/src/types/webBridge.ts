import type {
  ImagePickerCancelMessageT,
  ImagePickerErrorMessageT,
  ImagePickerSuccessMessageT,
  OpenImagePickerMessageT,
} from './image';
import type {
  SetAppTokenMessageT,
  StoreTokenMessageT,
  WebReadyToReceiveTokenMessageT,
} from './token';

export type WebBridgeMessageT =
  | OpenImagePickerMessageT
  | ImagePickerSuccessMessageT
  | ImagePickerCancelMessageT
  | ImagePickerErrorMessageT
  | StoreTokenMessageT
  | WebReadyToReceiveTokenMessageT
  | SetAppTokenMessageT;
