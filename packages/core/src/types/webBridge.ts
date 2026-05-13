/**
 * NOTE: payload 타입이 메시지마다 달라지기 때문에 추후에 union 타입으로 변경 예정. 
 * 
 * ex) export type WebviewMessageT =
  | ImageUploadSuccessT
  | ImageUploadCancelT
 */
export type WebBridgeMessageT = {
  type: string;
  payload?: Record<string, unknown>;
};
