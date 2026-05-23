import WarningIconFill from '@/assets/icons/fill/warning.svg';

export default function SmErrorFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <WarningIconFill width={30} height={30} className="text-red-400" aria-hidden />
    </div>
  );
}
