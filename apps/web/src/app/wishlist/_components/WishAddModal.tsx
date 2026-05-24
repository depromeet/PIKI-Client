'use client';

import { createPortal } from 'react-dom';

type WishAddOptionT = {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
};

type WishAddModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  options: WishAddOptionT[];
};

function WishAddModal({ isOpen, onClose, title, options }: WishAddModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-40 bg-black/40" aria-hidden="true" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed top-1/2 left-1/2 z-50 flex w-[362px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[15px] rounded-[24px] bg-white p-5"
      >
        <p id="modal-title" className="heading-1 text-[#2D3037]">
          {title}
        </p>

        <div className="flex w-full flex-col gap-2">
          {options.map(({ icon, label, description, onClick }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className="flex w-full items-center gap-[16px] rounded-[12px] border border-[#DCDEE2] bg-white px-5 pt-4 pb-[15px] active:bg-gray-50"
            >
              <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[24px] bg-[#F4F4F6] text-[#686F7E]">
                {icon}
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="body-1-semibold text-[#2D3037]">{label}</span>
                <span className="body-2-regular text-[#686F7E]">{description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>,
    document.body
  );
}

export default WishAddModal;
