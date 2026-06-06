'use client';

import { toast } from 'sonner';

import { Toaster } from '@/components/toast';

function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-6">
      <h1 className="text-xl font-semibold">토스트 테스트</h1>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white"
          onClick={() =>
            toast.success('성공 토스트입니다.', {
              duration: 100000,
            })
          }
        >
          success
        </button>
        <button
          type="button"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
          onClick={() =>
            toast.info('정보 토스트입니다.', {
              duration: 100000,
            })
          }
        >
          info
        </button>
        <button
          type="button"
          className="rounded-md bg-amber-500 px-4 py-2 text-sm text-white"
          onClick={() =>
            toast.warning('경고 토스트입니다.', {
              duration: 100000,
            })
          }
        >
          warning
        </button>
      </div>
      <Toaster />
    </main>
  );
}

export default Home;
