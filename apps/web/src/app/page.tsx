import ButtonLink from '@/components/common/button/ButtonLink';

function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-12 title-1">PIKI</h1>

      <ButtonLink href="/login">로그인 페이지로 이동</ButtonLink>
    </div>
  );
}

export default Page;
