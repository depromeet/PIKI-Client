'use client';

import { Kode_Mono } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ChevronBackwardIconFill } from '@/assets/icons/fill';
import PikiReceiptLogo from '@/assets/images/piki-receipt-logo.svg';
import ReceiptZigzag from '@/assets/images/tournament/result/receipt-zigzag.svg';
import { cn } from '@/utils/cn';

import { useGetTournament } from '../../../_common/_hooks/useGetTournament';
import { useGetGroupResult } from '../../_hooks/useGetGroupResult';
import type { GroupResultItemT, GroupResultParticipantT } from '../../_types/groupResult';
import { formatDate, formatPrice, formatTime } from '../../_utils/formatReceipt';

const kodeMono = Kode_Mono({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

type GroupResultClientProps = {
  tournamentId: number;
};

const buildChosenByLabel = (chosenBy: GroupResultParticipantT[]) => {
  const [first, ...rest] = chosenBy;
  if (!first) return '';
  if (rest.length === 0) return first.nickname;
  return `${first.nickname} 외 ${rest.length}명`;
};

const SectionDivider = () => <div className="h-px w-full border-t border-dashed border-gray-100" />;

const PlaceLabel = ({ label }: { label: string }) => (
  <p className="text-center text-text-neutral-secondary">
    <span className="text-[10px] leading-4.5 tracking-[-0.4px]">******************</span>
    <span className="text-[12px] leading-4.5 tracking-[-0.4px]">{label}</span>
    <span className="text-[10px] leading-4.5 tracking-[-0.4px]">******************</span>
  </p>
);

function GroupResultClient({ tournamentId }: GroupResultClientProps) {
  const router = useRouter();
  const { tournamentData } = useGetTournament(tournamentId);
  const { groupResultData, isGroupResultPending, isGroupResultError } =
    useGetGroupResult(tournamentId);

  const date = new Date();
  const tournamentName = tournamentData.name;

  // 친구가 아직 본인 매치를 시작 안 했거나, 권한 없음 등으로 데이터를 받지 못한 경우.
  if (isGroupResultPending || isGroupResultError || !groupResultData) {
    return (
      <main className="flex min-h-dvh flex-col bg-bg-layer-basement pt-15 pb-8">
        <header className="relative flex h-7.5 w-full shrink-0 items-center px-5">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={() => router.back()}
            className="cursor-pointer p-0.75"
          >
            <ChevronBackwardIconFill className="size-6 text-icon-neutral-secondary" />
          </button>
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 heading-1 text-text-neutral-primary">
            친구 토너먼트 결과
          </h1>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-5">
          <p className="heading-1 text-text-neutral-primary">아직 친구 결과가 없어요</p>
          <p className="text-center body-1-medium text-text-neutral-tertiary">
            친구가 토너먼트를 완료하면
            <br />
            결과를 비교해볼 수 있어요.
          </p>
        </div>
      </main>
    );
  }

  const sortedItems = [...groupResultData.items].sort((a, b) => a.rank - b.rank);
  const firstItem = sortedItems.find(item => item.rank === 1);
  const otherItems = sortedItems.filter(item => item.rank !== 1);

  return (
    <main className="flex min-h-dvh flex-col bg-bg-layer-basement pt-15 pb-8">
      <header className="relative flex h-7.5 w-full shrink-0 items-center px-5">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => router.back()}
          className="cursor-pointer p-0.75"
        >
          <ChevronBackwardIconFill className="size-6 text-icon-neutral-secondary" />
        </button>
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 heading-1 text-text-neutral-primary">
          친구 토너먼트 결과
        </h1>
      </header>

      <div className="mx-auto mt-5 flex w-full max-w-105 flex-1 flex-col px-5">
        <div
          className={cn(
            kodeMono.className,
            'relative flex w-full flex-col gap-2 bg-bg-layer-default pt-6 pb-6.25 filter-[drop-shadow(0px_2px_4px_rgba(0,0,0,0.12))]'
          )}
        >
          {/* PIKI 로고 + 헤드라인 */}
          <div className="relative flex flex-col items-center gap-4">
            <PikiReceiptLogo aria-label="PIKI" className="h-14 w-19.25" />
            <p className="text-center text-[12px] leading-4 font-semibold tracking-[-0.4px] text-text-neutral-secondary">
              FROM ENDLESS WISHLISTS,
              <br />
              TO TODAY&apos;S ONE PICK.
            </p>
          </div>

          <div className="flex flex-col">
            {/* 날짜 / 시간 */}
            <div className="flex items-center justify-between px-5">
              <span className="caption-1-semibold text-text-neutral-secondary">
                {formatDate(date)}
              </span>
              <span className="caption-1-semibold text-text-neutral-secondary">
                {formatTime(date)}
              </span>
            </div>

            <SectionDivider />

            {/* 토너먼트 이름 */}
            <div className="flex flex-col px-5 py-2">
              <p className="caption-1-semibold text-text-neutral-secondary">Tournament name</p>
              <p className="caption-1-semibold text-text-neutral-secondary">{tournamentName}</p>
            </div>

            <SectionDivider />

            <div className="flex items-center justify-center px-5 py-2">
              <p className="caption-1-semibold text-text-neutral-secondary">Tournament Results</p>
            </div>

            <SectionDivider />

            {/* 1st Place — 강조 카드 */}
            {firstItem && (
              <div className="flex flex-col gap-3 py-3">
                <PlaceLabel label="1st Place" />
                <FirstPlaceCard item={firstItem} />
              </div>
            )}

            {/* Others — 2위 이하 */}
            {otherItems.length > 0 && (
              <div className="flex flex-col gap-3 py-3">
                <PlaceLabel label="Others" />
                <ul className="flex flex-col gap-3 px-5">
                  {otherItems.map(item => (
                    <OtherPlaceRow key={`${item.rank}-${item.itemId}`} item={item} />
                  ))}
                </ul>
              </div>
            )}

            <SectionDivider />

            <p className="px-5 py-2 text-center caption-1-semibold text-text-neutral-secondary">
              @piki.day
            </p>
          </div>

          <ReceiptZigzag
            aria-hidden
            preserveAspectRatio="none"
            className="pointer-events-none absolute top-full left-0 block h-4.5 w-full"
          />
        </div>
      </div>
    </main>
  );
}

function FirstPlaceCard({ item }: { item: GroupResultItemT }) {
  const chosenByLabel = buildChosenByLabel(item.chosenBy);

  return (
    <div className="flex flex-col gap-3 px-5">
      <div className="flex items-center gap-3">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={56}
            height={56}
            className="size-14 shrink-0 rounded-md object-cover"
            unoptimized
          />
        ) : (
          <div className="size-14 shrink-0 rounded-md bg-gray-50" aria-hidden />
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          {chosenByLabel && (
            <p className="truncate caption-1-semibold text-text-neutral-secondary">
              {chosenByLabel}
            </p>
          )}
          <p className="truncate text-[12px] leading-4.5 font-semibold tracking-[-0.4px] text-text-neutral-primary">
            {item.name}
          </p>
          <p className="text-[14px] leading-5.5 font-bold tracking-[-0.6px] text-text-neutral-primary">
            {formatPrice(item.price)}
          </p>
        </div>
      </div>

      {item.chosenBy.length > 0 && (
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {item.chosenBy.map(participant => (
            <li key={participant.userId} className="flex items-center gap-1.5">
              <Image
                src={participant.profileImage}
                alt={participant.nickname}
                width={18}
                height={18}
                className="size-4.5 shrink-0 rounded-full bg-gray-50 object-cover"
                unoptimized
              />
              <span className="caption-1-semibold text-text-neutral-secondary">
                {participant.nickname}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function OtherPlaceRow({ item }: { item: GroupResultItemT }) {
  const count = item.chosenBy.length;
  const firstChooser = item.chosenBy[0];

  return (
    <li className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <p className="flex-1 truncate caption-1-semibold text-text-neutral-secondary">
          {item.name}
        </p>
        <p className="caption-1-semibold text-text-neutral-secondary">{count}명</p>
      </div>
      {firstChooser && (
        <div className="flex items-center gap-1.5">
          <Image
            src={firstChooser.profileImage}
            alt={firstChooser.nickname}
            width={16}
            height={16}
            className="size-4 shrink-0 rounded-full bg-gray-50 object-cover"
            unoptimized
          />
          <span className="caption-1-semibold text-text-neutral-secondary">
            {firstChooser.nickname}
          </span>
        </div>
      )}
    </li>
  );
}

export default GroupResultClient;
