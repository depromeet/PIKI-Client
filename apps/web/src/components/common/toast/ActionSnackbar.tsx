type ActionSnackbarProps = {
  message: string;
  actionLabel: string;
  isVisible: boolean;
  onAction: () => void;
};

function ActionSnackbar({ message, actionLabel, isVisible, onAction }: ActionSnackbarProps) {
  return (
    <div
      role="status"
      className={`relative flex w-full items-center gap-8 overflow-hidden rounded-xl px-4 py-[11px] backdrop-blur-[32px] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <span aria-hidden className="absolute inset-0 bg-gray-900 opacity-[0.52]" />
      <span aria-hidden className="absolute inset-0 bg-blue-600 opacity-[0.05]" />
      <p className="relative flex-1 px-0.5 py-[5px] text-[15px] leading-snug font-semibold text-white opacity-[0.88]">
        {message}
      </p>
      <button
        type="button"
        onClick={onAction}
        className="relative shrink-0 px-0.5 py-1 text-[15px] leading-snug font-semibold tracking-[0.144px] text-white"
      >
        {actionLabel}
      </button>
    </div>
  );
}

export default ActionSnackbar;
