'use client';

import Link from 'next/link';

import { ROUTES } from '@/consts/route';

type Props = {
  error: Error & { digest?: string; statusCode?: number };
  reset: () => void;
};

// TODO: 임시 에러 페이지 - 디자인 변경 필요
export default function Error({ error, reset }: Props) {
  console.error(error);
  const statusCode = error.statusCode || (error.digest ? parseInt(error.digest) : 500);
  const isClientError = statusCode >= 400 && statusCode < 500;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-white px-5 pt-padding-top">
      <div className="w-full text-center">
        <p className="title-lg mb-2">
          {isClientError ? '요청 오류가 발생했습니다' : '서버 오류가 발생했습니다'}
        </p>
        <p className="body-md text-secondary mb-6">
          {isClientError
            ? '잘못된 요청입니다. 입력값을 확인해주세요.'
            : '일시적인 오류입니다. 잠시 후 다시 시도해주세요.'}
        </p>
        {(error.message || statusCode) && (
          <div className="mb-4 rounded-lg bg-gray-50 p-4 text-left">
            {statusCode && (
              <div className="mb-2">
                <span className="body-sm text-secondary font-medium">에러 코드: </span>
                <span className="body-sm font-semibold text-gray-900">{statusCode}</span>
              </div>
            )}
            {error.message && (
              <div>
                <span className="body-sm text-secondary font-medium">에러 메시지: </span>
                <span className="body-sm text-gray-900">{error.message}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex w-full max-w-[400px] gap-4">
        <button
          type="button"
          onClick={reset}
          className="body-lg flex-1 rounded-3xl bg-gray-900 py-3 text-center font-medium text-white"
        >
          다시 시도
        </button>
        <Link
          href={ROUTES.HOME}
          className="body-lg flex-1 rounded-3xl bg-gray-100 py-3 text-center font-medium text-gray-900"
        >
          홈으로
        </Link>
      </div>
    </div>
  );
}
