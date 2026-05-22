type ToastVariantT = 'error';

type ToastProps = {
  message: string;
  icon?: React.ReactNode;
  isVisible: boolean;
  variant?: ToastVariantT;
};

// variant별 배경색 — 추후 'info' | 'success' 등 추가 시 여기에 색 추가
const variantBg: Record<ToastVariantT, string> = {
  error: 'bg-[#FEEDEC]',
};

function Toast({ message, icon, isVisible, variant = 'error' }: ToastProps) {
  return (
    <div
      className={`flex h-[67px] w-full items-center gap-5 rounded-[12px] px-5 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'} ${variantBg[variant]}`}
    >
      {icon && (
        <div className="flex size-[26.787px] shrink-0 items-center justify-center">
          {icon}
        </div>
      )}
      <span className="caption-1-semibold whitespace-pre-line text-[#2D3037]">{message}</span>
    </div>
  );
}

export default Toast;
