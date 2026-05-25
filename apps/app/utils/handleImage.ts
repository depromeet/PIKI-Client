import {
  type NativeImagePayloadT,
  type OpenImagePickerPayloadT,
  WEBBRIDGE_MESSAGE_TYPE,
} from '@piki/core';
import type { ImagePickerAsset } from 'expo-image-picker';
import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';

import { WebBridge } from '@/utils/webBridge';

const DEFAULT_MIME_TYPE = 'image/jpeg';
const DEFAULT_IMAGE_EXTENSION = 'jpeg';

const getFileName = (asset: ImagePickerAsset, index: number): string => {
  if (asset.fileName) return asset.fileName;

  const extension = asset.mimeType?.split('/')[1] ?? DEFAULT_IMAGE_EXTENSION;
  return `image-${index + 1}.${extension}`;
};

const uriToNativeImagePayload = async (
  asset: ImagePickerAsset,
  index: number
): Promise<NativeImagePayloadT> => {
  if (!asset.base64) throw new Error('이미지 Base64 데이터가 없습니다.');

  return {
    base64: asset.base64,
    mimeType: asset.mimeType ?? DEFAULT_MIME_TYPE,
    fileName: getFileName(asset, index),
  };
};

/** OPEN_IMAGE_PICKER 수신 시 앨범 피커 오픈 → Base64 bridge 응답 */
export const handleOpenImagePicker = async ({ requestId, maxCount }: OpenImagePickerPayloadT) => {
  try {
    const permission = await requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      WebBridge.postMessage(WEBBRIDGE_MESSAGE_TYPE.IMAGE_PICKER_ERROR, {
        requestId,
        detail: '사진 보관함 접근 권한이 필요합니다.',
      });
      return;
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: maxCount,
      quality: 0.7,
      base64: true,
    });

    if (result.canceled || result.assets.length === 0) {
      WebBridge.postMessage(WEBBRIDGE_MESSAGE_TYPE.IMAGE_PICKER_CANCEL, { requestId });
      return;
    }

    const selectedAssets = result.assets.slice(0, maxCount);
    const images = await Promise.all(
      selectedAssets.map((asset, index) => uriToNativeImagePayload(asset, index))
    );

    WebBridge.postMessage(WEBBRIDGE_MESSAGE_TYPE.IMAGE_PICKER_SUCCESS, {
      requestId,
      images,
    });
  } catch {
    WebBridge.postMessage(WEBBRIDGE_MESSAGE_TYPE.IMAGE_PICKER_ERROR, {
      requestId,
      detail: '이미지 선택 중 오류가 발생했습니다.',
    });
  }
};
