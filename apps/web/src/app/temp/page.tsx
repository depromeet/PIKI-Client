'use client';

import { WEBBRIDGE_MESSAGE_TYPE, type ShareIntentPayloadT } from '@piki/core';
import { useCallback, useEffect, useState } from 'react';

import { useWebBridgeMessage } from '@/hooks/useWebBridgeMessage';
import { WebBridge, isWebview } from '@/utils/webBridge';

/** ShareIntent payload type guard (필수 필드: type/webUrl/files 만 검증) */
const isShareIntentPayloadT = (value: unknown): value is ShareIntentPayloadT => {
  if (typeof value !== 'object' || value === null) return false;
  if (!('type' in value) || !('webUrl' in value) || !('files' in value)) return false;

  const { type, webUrl, files } = value;

  const isValidType =
    type === null ||
    type === 'media' ||
    type === 'file' ||
    type === 'text' ||
    type === 'weburl';
  if (!isValidType) return false;

  if (webUrl !== null && typeof webUrl !== 'string') return false;
  if (files !== null && !Array.isArray(files)) return false;

  return true;
};

function TempPage() {
  const [intent, setIntent] = useState<ShareIntentPayloadT | null>(null);
  const [productUrl, setProductUrl] = useState('');
  /** null = 아직 모름 (SSR/hydration 직전) — false일 때만 안내문구 표시해서 깜빡임 방지 */
  const [inWebview, setInWebview] = useState<boolean | null>(null);

  /** 마운트 직후 한 번 + 짧은 폴링으로 RN WebView 여부 확정 */
  useEffect(() => {
    const check = () => setInWebview(isWebview());
    check();

    const intervalId = window.setInterval(check, 100);
    const timeoutId = window.setTimeout(() => window.clearInterval(intervalId), 2000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  /** hydration 완료 ACK: RN에 "이제 메시지 받을 준비됨" 알림 (race 방지) */
  useEffect(() => {
    WebBridge.postMessage(WEBBRIDGE_MESSAGE_TYPE.WEB_READY);
  }, []);

  useWebBridgeMessage(message => {
    if (message.type !== WEBBRIDGE_MESSAGE_TYPE.SHARE_INTENT) return;
    if (!isShareIntentPayloadT(message.payload)) return;
    setIntent(message.payload);
  });

  /** ShareIntent 수신 시 webUrl을 input에 반영 */
  useEffect(() => {
    if (!intent?.webUrl) return;
    setProductUrl(intent.webUrl);
  }, [intent]);

  const handleRegisterProduct = useCallback(() => {
    /** TODO: 상품 등록 API 연동 */
  }, []);

  return (
    <div className="flex min-h-full flex-col gap-4 p-4 pb-20">
      <h1 className="text-lg font-semibold text-gray-900">상품 URL 등록</h1>

      {inWebview === false && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          RN WebView가 아닙니다. 앱에서 공유 → PIKI로 이 페이지를 열면 URL이 자동으로 채워집니다.
        </p>
      )}

      <section className="flex flex-col gap-3">
        <label htmlFor="product-url" className="text-sm font-medium text-gray-900">
          상품 Url 등록
        </label>

        <input
          id="product-url"
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder="https://"
          value={productUrl}
          onChange={event => setProductUrl(event.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />

        <button
          type="button"
          className="w-full rounded-md bg-blue-600 px-3 py-2.5 text-sm font-medium text-white disabled:bg-gray-300"
          disabled={!productUrl.trim()}
          onClick={handleRegisterProduct}
        >
          상품 등록
        </button>
      </section>

      <section className="rounded-lg border border-gray-200 bg-gray-50 p-3">
        <p className="text-sm font-medium text-gray-700">ShareIntent (디버그)</p>
        {intent ? (
          <pre className="mt-2 overflow-x-auto text-xs text-gray-900">
            {JSON.stringify(intent, null, 2)}
          </pre>
        ) : (
          <p className="mt-2 text-xs text-gray-500">대기 중…</p>
        )}
      </section>
    </div>
  );
}

export default TempPage;
