import { CheckCircledIconFill } from '@/assets/icons';

type SuccessToastProps = {
  message: string;
  isVisible: boolean;
};

function SuccessToast({ message, isVisible }: SuccessToastProps) {
  return (
    <div
      role="status"
      className={`relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-4 py-2.5 backdrop-blur-[32px] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <span aria-hidden className="absolute inset-0 bg-gray-900 opacity-[0.52]" />
      <span aria-hidden className="absolute inset-0 bg-[#0066FF] opacity-[0.05]" />
      <CheckCircledIconFill className="relative size-6 shrink-0 text-icon-success" />
      <span className="body-2-semibold relative flex-1 text-white opacity-[0.88]">{message}</span>
    </div>
  );
}

export default SuccessToast;
