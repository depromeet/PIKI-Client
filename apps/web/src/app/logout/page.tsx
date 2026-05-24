import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import LogoutButton from './_components/LogoutButton';

// TEMP
async function LogoutPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) redirect('/login');

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="mb-12 title-1">로그아웃</h1>

      <LogoutButton />
    </div>
  );
}

export default LogoutPage;
