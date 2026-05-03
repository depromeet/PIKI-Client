type RoundBadgeProps = {
  label: string;
};

export default function RoundBadge({ label }: RoundBadgeProps) {
  return (
    <div className="inline-flex items-center justify-center gap-2.5 rounded-[30px] bg-[#DCDEE2] px-5 py-4 font-bold text-[#2D3037]">
      {label}
    </div>
  );
}
