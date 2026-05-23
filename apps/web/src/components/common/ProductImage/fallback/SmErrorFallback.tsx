import WarningIconFill from '@/assets/icons/fill/warning.svg';

function SmErrorFallback() {
  return (
    <div className="absolute -top-2 -right-2">
      <WarningIconFill width={20} height={20} aria-hidden />
    </div>
  );
}

export default SmErrorFallback;
