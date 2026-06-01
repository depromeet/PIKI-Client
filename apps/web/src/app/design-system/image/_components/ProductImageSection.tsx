'use client';

import { useState } from 'react';

import ProductImage from '@/app/tournament/[id]/create/_components/product-image';

import DemoRow from './DemoRow';

const SUCCESS_URL =
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&h=400&fit=crop&auto=format';

function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-2 rounded-md border border-[rgba(112,115,124,0.22)] px-3 py-1 caption-1-regular text-[rgba(55,56,60,0.61)] transition hover:bg-gray-50"
    >
      다시 재생
    </button>
  );
}

function ProductImageSection() {
  const [lgKey, setLgKey] = useState(0);
  const [smKey, setSmKey] = useState(0);

  return (
    <section className="flex flex-col gap-12">
      <h2 className="text-[20px] leading-[1.334] font-bold tracking-[-0.45px] text-black sm:text-[24px] sm:tracking-[-0.552px]">
        ProductImage
      </h2>

      {/* Props 테이블 */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[18px] leading-[1.334] font-bold tracking-[-0.45px] text-black">
          Props
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-[rgba(112,115,124,0.22)]">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="border-b border-[rgba(112,115,124,0.22)] bg-gray-50">
                <th className="px-4 py-3 text-left caption-1-semibold text-[rgba(55,56,60,0.61)] sm:px-6">
                  프로퍼티
                </th>
                <th className="px-4 py-3 text-left caption-1-semibold text-[rgba(55,56,60,0.61)]">
                  타입
                </th>
                <th className="px-4 py-3 text-left caption-1-semibold text-[rgba(55,56,60,0.61)]">
                  값
                </th>
                <th className="px-4 py-3 text-left caption-1-semibold text-[rgba(55,56,60,0.61)]">
                  설명
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(112,115,124,0.08)] px-4 sm:px-6">
              <tr className="border-b border-[rgba(112,115,124,0.12)] last:border-b-0">
                <td className="px-4 py-4 pr-6 align-top sm:px-6">
                  <span className="body-1-semibold text-[#171719]">size</span>
                </td>
                <td className="py-4 pr-6 align-top">
                  <span className="rounded-md bg-purple-50 px-2 py-0.5 caption-1-semibold text-purple-500">
                    {`'sm' | 'lg'`}
                  </span>
                </td>
                <td className="py-4 pr-6 align-top font-mono caption-1-regular text-[rgba(55,56,60,0.61)]">
                  sm / lg
                </td>
                <td className="py-4 align-top body-2-regular text-[rgba(55,56,60,0.8)]">
                  <p className="font-semibold">이미지 컴포넌트의 크기를 정의합니다.</p>
                  <p className="mt-1">lg) 상품 등록 확인용으로 크게 표시될 때 (200×200)</p>
                  <p>sm) 썸네일, 컴포넌트 준비 화면 등 작게 표시될 때 (72×72)</p>
                </td>
              </tr>
              <tr className="border-b border-[rgba(112,115,124,0.12)] last:border-b-0">
                <td className="px-4 py-4 pr-6 align-top sm:px-6">
                  <span className="body-1-semibold text-[#171719]">loadingFallback</span>
                </td>
                <td className="py-4 pr-6 align-top">
                  <span className="rounded-md bg-green-50 px-2 py-0.5 caption-1-semibold text-green-600">
                    ReactNode
                  </span>
                </td>
                <td className="py-4 pr-6 align-top font-mono caption-1-regular text-[rgba(55,56,60,0.61)]">
                  —
                </td>
                <td className="py-4 align-top body-2-regular text-[rgba(55,56,60,0.8)]">
                  <p className="font-semibold">로딩 중 표시할 커스텀 UI입니다.</p>
                  <p className="mt-1">미전달 시 기본 Spinner가 표시됩니다.</p>
                </td>
              </tr>
              <tr className="border-b border-[rgba(112,115,124,0.12)] last:border-b-0">
                <td className="px-4 py-4 pr-6 align-top sm:px-6">
                  <span className="body-1-semibold text-[#171719]">errorFallback</span>
                </td>
                <td className="py-4 pr-6 align-top">
                  <span className="rounded-md bg-green-50 px-2 py-0.5 caption-1-semibold text-green-600">
                    ReactNode
                  </span>
                </td>
                <td className="py-4 pr-6 align-top font-mono caption-1-regular text-[rgba(55,56,60,0.61)]">
                  —
                </td>
                <td className="py-4 align-top body-2-regular text-[rgba(55,56,60,0.8)]">
                  <p className="font-semibold">에러 시 표시할 커스텀 UI입니다.</p>
                  <p className="mt-1">미전달 시 size에 따라 기본 에러 UI가 표시됩니다.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* size=lg 데모 */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[18px] leading-[1.334] font-bold tracking-[-0.45px] text-black">
          size=lg{' '}
          <span className="ml-2 font-mono caption-1-regular text-[rgba(55,56,60,0.61)]">
            200×200 · rounded-[12px]
          </span>
        </h3>
        <div className="rounded-2xl border border-[rgba(112,115,124,0.22)] px-4 sm:px-6">
          <DemoRow
            size="lg"
            label="Success"
            description="src가 유효한 이미지 URL일 때 정상 렌더링됩니다."
          >
            <ProductImage
              key={`lg-success-${lgKey}`}
              src={SUCCESS_URL}
              size="lg"
              alt="상품 이미지 성공 예시"
            />
          </DemoRow>
          <DemoRow
            size="lg"
            label="Loading"
            description="이미지를 불러오는 동안 중앙에 스피너가 표시됩니다."
          >
            <div className="flex flex-col items-center gap-2">
              <ProductImage
                key={`lg-loading-${lgKey}`}
                src={SUCCESS_URL}
                size="lg"
                alt="상품 이미지 로딩 예시"
              />
              <ReplayButton onClick={() => setLgKey(k => k + 1)} />
            </div>
          </DemoRow>
          <DemoRow
            size="lg"
            label="Fail"
            description="src가 없거나 로드에 실패하면 직접 가져오기 안내 UI를 표시합니다."
          >
            <ProductImage src="/invalid-image.jpg" size="lg" alt="상품 이미지 에러 예시" />
          </DemoRow>
        </div>
      </div>

      {/* size=sm 데모 */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[18px] leading-[1.334] font-bold tracking-[-0.45px] text-black">
          size=sm{' '}
          <span className="ml-2 font-mono caption-1-regular text-[rgba(55,56,60,0.61)]">
            72×72 · rounded-[16px] · border + shadow
          </span>
        </h3>
        <div className="rounded-2xl border border-[rgba(112,115,124,0.22)] px-4 sm:px-6">
          <DemoRow
            size="sm"
            label="Success"
            description="src가 유효한 이미지 URL일 때 정상 렌더링됩니다."
          >
            <ProductImage
              key={`sm-success-${smKey}`}
              src={SUCCESS_URL}
              size="sm"
              alt="상품 이미지 성공 예시"
            />
          </DemoRow>
          <DemoRow
            size="sm"
            label="Loading"
            description="이미지를 불러오는 동안 중앙에 스피너가 표시됩니다."
          >
            <div className="flex flex-col items-center gap-2">
              <ProductImage
                key={`sm-loading-${smKey}`}
                src={SUCCESS_URL}
                size="sm"
                alt="상품 이미지 로딩 예시"
              />
              <ReplayButton onClick={() => setSmKey(k => k + 1)} />
            </div>
          </DemoRow>
          <DemoRow
            size="sm"
            label="Fail"
            description="로드 실패 시 우측 상단에 경고 아이콘이 표시됩니다."
          >
            <ProductImage src="/invalid-image.jpg" size="sm" alt="상품 이미지 에러 예시" />
          </DemoRow>
        </div>
      </div>
    </section>
  );
}

export default ProductImageSection;
