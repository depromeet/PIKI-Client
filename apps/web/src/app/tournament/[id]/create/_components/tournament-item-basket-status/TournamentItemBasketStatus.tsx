import { cn } from '@/utils/cn';

type TournamentItemBasketStatusProps = {
  isProcessing: boolean;
  count: number;
  isDepositClosed?: boolean;
};

function TournamentItemBasketStatus({
  isProcessing,
  count,
  isDepositClosed = false,
}: TournamentItemBasketStatusProps) {
  const label = (() => {
    if (isProcessing) return '담는 중...';
    if (count < 2) return '최소 2개 이상 담아주세요';
    return `${count}/32`;
  })();

  return (
    <div className="flex items-center justify-center">
      <span
        className={cn(
          'inline-flex h-10 items-center rounded-3xl border px-3 body-2-regular',
          isDepositClosed
            ? 'border-transparent bg-transparent text-text-accent'
            : 'border-gray-100 bg-gray-75 text-gray-600'
        )}
      >
        {label}
      </span>
    </div>
  );
}

export default TournamentItemBasketStatus;
