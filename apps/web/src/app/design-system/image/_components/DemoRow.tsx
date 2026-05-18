type DemoRowProps = {
  size: 'lg' | 'sm';
  label: string;
  description: string;
  children: React.ReactNode;
};

function DemoRow({ size, label, description, children }: DemoRowProps) {
  return (
    <div className="flex items-center gap-6 border-b border-[rgba(112,115,124,0.12)] py-5 last:border-b-0">
      <div
        className="flex shrink-0 items-center justify-center"
        style={{ width: size === 'lg' ? 200 : 72 }}
      >
        {children}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="body-1-semibold text-[#171719]">{label}</span>
        <span className="body-2-regular text-[rgba(55,56,60,0.61)]">{description}</span>
      </div>
    </div>
  );
}

export default DemoRow;
