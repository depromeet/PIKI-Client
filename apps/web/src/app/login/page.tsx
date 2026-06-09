import PikiLogo from '@/assets/images/piki-logo.svg';

import LoginButtons from './_components/LoginButtons';

function LoginPage() {
  return (
    <div className="flex min-h-full flex-col items-center bg-gray-50 pt-28">
      <div className="flex flex-col items-center gap-6">
        <PikiLogo aria-label="PIKI" />
        <p className="whitespace-pre-line text-center body-1-bold text-text-neutral-secondary">
          {'매일 쌓여만 가던\n위시리스트가 오늘의 결정으로'}
        </p>
      </div>

      <div className="mt-[90px] w-full px-4">
        <LoginButtons />
      </div>
    </div>
  );
}

export default LoginPage;
