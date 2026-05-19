'use client';

import { isWebBridgeMessageT, type WebBridgeMessageT } from '@piki/core';
import { useCallback, useEffect, useRef, useState } from 'react';

import { WebBridge, isWebview } from '@/utils/webBridge';

type LogEntryT = {
  id: number;
  summary: string;
};

const toRawString = (data: unknown) => {
  if (typeof data === 'string') return data;
  try {
    return JSON.stringify(data);
  } catch {
    return String(data);
  }
};

const summarizeAppMessage = (raw: string): string | null => {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isWebBridgeMessageT(parsed)) return null;
    return `type=${parsed.type} payload=${JSON.stringify(parsed.payload ?? {})}`;
  } catch {
    return null;
  }
};

function BridgeDebugPage() {
  const logIdRef = useRef(0);
  const [inWebview, setInWebview] = useState(false);
  const [fromAppLogs, setFromAppLogs] = useState<LogEntryT[]>([]);
  const [webSendSeq, setWebSendSeq] = useState(0);

  /** 브리지 주입이 늦을 수 있어 화면에서만 짧게 폴링 */
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setInWebview(prev => {
        const next = isWebview();
        return prev === next ? prev : next;
      });
    }, 100);

    const timeoutId = window.setTimeout(() => window.clearInterval(intervalId), 4000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const handleWindowMessage = (event: MessageEvent) => {
      const raw = toRawString(event.data);
      const summary = summarizeAppMessage(raw);
      if (!summary) return;

      logIdRef.current += 1;
      const nextId = logIdRef.current;
      setFromAppLogs(prev => [{ id: nextId, summary }, ...prev].slice(0, 30));
    };

    window.addEventListener('message', handleWindowMessage);
    return () => window.removeEventListener('message', handleWindowMessage);
  }, []);

  const handleSendPingToApp = useCallback(() => {
    const nextSeq = webSendSeq + 1;
    setWebSendSeq(nextSeq);

    const payload: NonNullable<WebBridgeMessageT['payload']> = {
      seq: nextSeq,
      sentAt: new Date().toISOString(),
      note: '웹 → 앱 테스트 메시지',
    };

    WebBridge.postMessage('DEBUG_PING_FROM_WEB', payload);
  }, [webSendSeq]);

  return (
    <div className="flex min-h-full flex-col gap-4 p-4 pb-40">
      <h1 className="text-lg font-semibold text-gray-900">브리지 디버그</h1>

      <section className="rounded-lg border border-gray-200 bg-gray-50 p-3">
        <p className="text-sm text-gray-700">
          RN WebView:{' '}
          <span className={inWebview ? 'font-semibold text-green-700' : 'font-semibold text-red-600'}>
            {inWebview ? '예' : '아니오'}
          </span>
        </p>
      </section>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-3">
        <p className="text-sm font-medium text-blue-900">웹 → 앱</p>
        <button
          type="button"
          className="mt-2 w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white disabled:bg-gray-300"
          disabled={!inWebview}
          onClick={handleSendPingToApp}
        >
          보내기 (#{webSendSeq + 1})
        </button>
      </section>

      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
        <p className="text-sm font-medium text-emerald-900">앱 → 웹 수신</p>
        <ul className="mt-2 max-h-48 space-y-2 overflow-y-auto text-xs text-emerald-950">
          {fromAppLogs.length === 0 ? (
            <li className="text-emerald-700">없음</li>
          ) : (
            fromAppLogs.map(entry => <li key={entry.id}>{entry.summary}</li>)
          )}
        </ul>
      </section>
    </div>
  );
}

export default BridgeDebugPage;
