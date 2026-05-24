'use client';

import { EditIconFill, LinkIconFill } from '@/assets/icons';

import Input from '@/components/common/input';

function InputDocsPage() {
  return (
    <div className="min-h-dvh p-8 text-black">
      <h1 className="mb-8 text-2xl font-bold">Input</h1>

      <section className="mb-8 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Default</h2>
        <Input label="상품명" placeholder="텍스트를 입력해주세요." />
        <Input
          label="링크 URL"
          placeholder="복사한 링크를 입력해주세요."
          left={<LinkIconFill />}
        />
      </section>

      <section className="mb-8 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Filled</h2>
        <Input
          label="상품명"
          defaultValue="[3rd] Loose-fit paper knit [KNSS07KN01]_Crea..."
          right={<EditIconFill />}
        />
        <Input
          label="링크 URL"
          defaultValue="https://29cm.onelink.me/108020121..."
          left={<LinkIconFill />}
        />
      </section>

      <section className="mb-8 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Error</h2>
        <Input
          label="상품명"
          placeholder="텍스트를 입력해주세요."
          aria-invalid
          helperText="상품명을 입력해주세요."
        />
        <Input
          label="가격"
          defaultValue="0"
          aria-invalid
          helperText="1원 이상 입력해주세요."
        />
        <Input
          label="링크 URL"
          defaultValue="https://29cm.onelink.me/108020121..."
          aria-invalid
          left={<LinkIconFill />}
          helperText="올바른 URL 형식으로 입력해주세요."
        />
      </section>

      <section className="mb-8 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Disabled</h2>
        <Input label="상품명" placeholder="텍스트를 입력해주세요." disabled />
        <Input
          label="상품명"
          defaultValue="[3rd] Loose-fit paper knit [KNSS07KN01]_Crea..."
          disabled
        />
      </section>
    </div>
  );
}

export default InputDocsPage;
