import LoginButton from './_components/LoginButton';

// TEMP
function LoginPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="mb-12 title-1">로그인하기</h1>

      <div className="flex gap-2">
        <LoginButton identityType="GUEST" />
        <LoginButton identityType="MEMBER" />
      </div>
    </div>
  );
}

export default LoginPage;
