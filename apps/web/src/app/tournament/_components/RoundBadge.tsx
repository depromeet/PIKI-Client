type RoundBadgeProps = {
  label: string;
};

function RoundBadge({ label }: RoundBadgeProps) {
  return (
    <div className="inline-flex items-center justify-center gap-2.5 rounded-[30px] bg-gray-100 px-5 py-4 font-bold text-text-neutral-primary">
      {label}
    </div>
  );
}

export default RoundBadge;
