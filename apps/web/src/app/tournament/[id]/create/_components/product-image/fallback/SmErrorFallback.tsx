import { WarningIconFill } from '@/assets/icons';

function SmErrorFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <WarningIconFill className="size-7.5 text-red-300" aria-hidden />
    </div>
  );
}

export default SmErrorFallback;
