import type { WebBridgeMessageT } from '../types/webBridge';

export const isWebBridgeMessageT = (data: unknown): data is WebBridgeMessageT => {
  return (
    typeof data === 'object' && data !== null && 'type' in data && typeof data.type === 'string'
  );
};
