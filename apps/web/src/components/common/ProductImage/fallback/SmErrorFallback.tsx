import WarningIconFill from '@/assets/icons/fill/warning.svg';

export function SmErrorFallback() {
  return (
    <div className="absolute -top-2 -right-2">
      <WarningIconFill width={20} height={20} aria-hidden />
    </div>
  );
}
