import type {
  ImagePickerCancelMessageT,
  ImagePickerErrorMessageT,
  ImagePickerSuccessMessageT,
  OpenImagePickerMessageT,
} from './image';

export type WebBridgeMessageT =
  | OpenImagePickerMessageT
  | ImagePickerSuccessMessageT
  | ImagePickerCancelMessageT
  | ImagePickerErrorMessageT;
