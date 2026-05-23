'use client';

import { type WebBridgeMessageT, isWebBridgeMessageT } from '@piki/core';
import { useEffect, useRef } from 'react';

/**
 * WebBridge 메시지 수신 핸들러
 * 
 * @param handler WebBridge 메시지 처리 핸들러
 * 
 * @example
 * useWebBridgeMessage(msg => {
if (msg.type === 'LOGIN') login(msg.payload)
})
 * @example
  useWebBridgeMessage(msg => {
    switch (msg.type) {
      case 'HELLO_FROM_RN':
        console.log('RN → WEB', msg.payload)
        break

      case 'NAVIGATE':
        router.push(msg.payload ?? '/default')
        break
 */
export function useWebBridgeMessage(handler: (messageData: WebBridgeMessageT) => void) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      try {
        if (typeof event.data !== 'string') return;

        const parsed = JSON.parse(event.data);
        if (!isWebBridgeMessageT(parsed)) return;

        handlerRef.current(parsed);
      } catch {
        console.error('웹뷰 통신메시지 파싱실패');
      }
    };

    window.addEventListener('message', listener);

    return () => window.removeEventListener('message', listener);
  }, []);
}
