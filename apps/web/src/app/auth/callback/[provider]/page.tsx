import { Suspense } from 'react';

import CallbackHandler from './_components/CallbackHandler';

function AuthCallbackPage() {
  return (
    <Suspense>
      <CallbackHandler />
    </Suspense>
  );
}

export default AuthCallbackPage;
