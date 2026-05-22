type DemoCardProps = {
  label: string;
  children: React.ReactNode;
};

function DemoCard({ label, children }: DemoCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-[rgba(112,115,124,0.22)] p-6">
      {children}
      <span className="caption-1-regular text-[rgba(55,56,60,0.61)]">{label}</span>
    </div>
  );
}

export default DemoCard;
