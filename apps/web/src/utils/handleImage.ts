import type { NativeImagePayloadT } from '@piki/core';

/** 웹뷰 bridge Base64 payload → 웹 FormData 업로드용 File */
export const nativeImageToFile = (image: NativeImagePayloadT): File => {
  const binary = atob(image.base64);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);

  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);

  return new File([buffer], image.fileName, { type: image.mimeType });
};
