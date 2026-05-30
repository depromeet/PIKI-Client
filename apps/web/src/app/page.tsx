import { getMe } from '@/apis/getMe';
import ButtonLink from '@/components/common/button/ButtonLink';

import LogoutButton from './_components/LogoutButton';

// TEMP
async function Page() {
  let user;
  try {
    user = await getMe();
  } catch {
    user = null;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 px-5">
      <h1 className="title-1">PIKI</h1>

      {user && (
        <section className="w-full max-w-sm rounded-[12px] border border-gray-200 bg-bg-layer-default p-5 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)]">
          <h2 className="mb-4 border-b border-gray-100 pb-3 heading-2 text-text-neutral-primary">
            로그인된 유저 정보
          </h2>

          <dl className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <dt className="body-2 shrink-0 text-text-neutral-secondary">닉네임</dt>
              <dd className="body-2-semibold text-text-neutral-primary">{user.nickname}</dd>
            </div>

            <div className="flex items-center justify-between gap-4">
              <dt className="body-2 shrink-0 text-text-neutral-secondary">유저 유형</dt>
              <dd>
                <span
                  className={
                    user.identityType === 'GUEST'
                      ? 'rounded-full bg-gray-100 px-2.5 py-1 caption-1-semibold text-text-neutral-secondary'
                      : 'rounded-full bg-blue-50 px-2.5 py-1 caption-1-semibold text-blue-600'
                  }
                >
                  {user.identityType === 'GUEST' ? '게스트' : '회원'}
                </span>
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4">
              <dt className="body-2 shrink-0 text-text-neutral-secondary">유저 ID</dt>
              <dd className="truncate body-2-semibold text-text-neutral-primary">{user.id}</dd>
            </div>
          </dl>
        </section>
      )}

      <div className="flex w-full max-w-sm flex-col gap-2">
        <ButtonLink href="/login" size="lg">
          로그인
        </ButtonLink>
        {user && <LogoutButton />}
        <ButtonLink href="/home" size="lg">
          홈으로
        </ButtonLink>
      </div>
    </div>
  );
}

export default Page;
