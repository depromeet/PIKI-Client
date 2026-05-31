import WarningIconFill from '@/assets/icons/outline/warning.svg';

function SmErrorFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <WarningIconFill width="50%" height="50%" className="text-red-300" aria-hidden />
    </div>
  );
}

export default SmErrorFallback;
