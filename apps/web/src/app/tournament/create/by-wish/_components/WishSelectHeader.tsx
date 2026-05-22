import { MAX_SELECT, MIN_SELECT } from '../consts/selectLimits';

type WishSelectHeaderProps = {
  selectedCount: number;
  totalCount: number;
  tournamentCandidateCount?: number;
  isMaxExceeded: boolean;
};

function WishSelectHeader({ selectedCount, totalCount, tournamentCandidateCount, isMaxExceeded }: WishSelectHeaderProps) {
  const renderSubtitle = () => {
    // 최대 선택 초과 시도 시
    if (isMaxExceeded)
      return (
        <p>
          <span className="heading-2 text-[#686F7E]">최대 {MAX_SELECT}개</span>
          <span className="heading-2-medium text-[#ADB1BB]">까지 선택할 수 있어요</span>
        </p>
      );
    // 이미 토너먼트 후보가 담겨있을 때
    if (tournamentCandidateCount && tournamentCandidateCount > 0)
      return (
        <p className="whitespace-pre-line">
          <span className="heading-2 text-[#686F7E]">{tournamentCandidateCount}개가</span>
          <span className="heading-2-medium text-[#686F7E]">{' 이미 담겨있어요\n더 추가하고 싶은 상품을 골라보세요.'}</span>
        </p>
      );
    // 기본 상태
    return (
      <p className="whitespace-pre-line">
        <span className="heading-2 text-[#686F7E]">최소 {MIN_SELECT}개 이상</span>
        <span className="heading-2-medium text-[#ADB1BB]">{' 선택해야\n토너먼트를 시작할 수 있어요.'}</span>
      </p>
    );
  };

  return (
    <div className="mt-20 flex flex-col gap-[25px]">
      <div className="flex flex-col gap-2">
        <h1 className="title-1 text-[#171719]">비교할 위시템을 선택해주세요</h1>
        <div className="min-h-[52px]">{renderSubtitle()}</div>
      </div>
      <p className="body-1-medium">
        <span className="text-[#1A1A1A]">{selectedCount}</span>
        <span className="text-[#737373]">/{totalCount}개 선택 중</span>
      </p>
    </div>
  );
}

export default WishSelectHeader;
