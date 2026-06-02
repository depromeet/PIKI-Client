type TournamentItemBasketStatusProps = {
  isProcessing: boolean;
  count: number;
};

function TournamentItemBasketStatus({ isProcessing, count }: TournamentItemBasketStatusProps) {
  const label = (() => {
    if (isProcessing) return '담는 중...';
    if (count < 2) return '최소 2개 이상 담아주세요';
    return `${count}/32`;
  })();

  return (
    <div className="flex items-center justify-center">
      <span className="inline-flex h-[40px] items-center rounded-[24px] border border-gray-100 bg-gray-75 px-3 body-2-regular text-gray-600">
        {label}
      </span>
    </div>
  );
}

export default TournamentItemBasketStatus;
