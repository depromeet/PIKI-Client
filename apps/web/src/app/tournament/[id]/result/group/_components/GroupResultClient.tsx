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
import type { GroupResultItemT } from '../../_types/groupResult';

const kodeMono = Kode_Mono({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

type GroupResultClientProps = {
  tournamentId: number;
};

const formatDate = (date: Date) => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const formatTime = (date: Date) => {
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
};

const formatPrice = (price: number) => `${price.toLocaleString('ko-KR')}원`;

const PLACE_LABELS: Record<number, string> = {
  1: '1st Place',
  2: '2nd Place',
  3: '3rd Place',
  4: '4th Place',
};

const SectionDivider = () => <div className="h-px w-full border-t border-dashed border-gray-100" />;

const PlaceLabel = ({ rank }: { rank: number }) => {
  const label = PLACE_LABELS[rank] ?? `${rank}th Place`;
  return (
    <p className="text-center text-text-neutral-secondary">
      <span className="text-[10px] leading-[18px] tracking-[-0.4px]">******************</span>
      <span className="text-[12px] leading-[18px] tracking-[-0.4px]">{label}</span>
      <span className="text-[10px] leading-[18px] tracking-[-0.4px]">******************</span>
    </p>
  );
};

function GroupResultClient({ tournamentId }: GroupResultClientProps) {
  const router = useRouter();
  const { tournamentData } = useGetTournament(tournamentId);
  const { groupResultData } = useGetGroupResult(tournamentId);

  const date = new Date();
  const tournamentName = tournamentData.name;
  const items = groupResultData.items;

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

      <div className="mx-auto mt-5 flex w-full max-w-[420px] flex-1 flex-col px-5">
        <div
          className={cn(
            kodeMono.className,
            'relative flex w-full flex-col gap-2 bg-bg-layer-default pt-6 pb-6.25 filter-[drop-shadow(0px_2px_4px_rgba(0,0,0,0.12))]'
          )}
        >
          {/* PIKI 로고 + 헤드라인 */}
          <div className="relative flex flex-col items-center gap-4">
            <PikiReceiptLogo aria-label="PIKI" className="h-14 w-19.25" />
            <p className="text-center text-[12px] leading-[16px] font-semibold tracking-[-0.4px] text-text-neutral-secondary">
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

            {/* rank별 아이템 + chosenBy */}
            {items.map(item => (
              <GroupResultRow key={`${item.rank}-${item.itemId}`} item={item} />
            ))}

            <SectionDivider />

            <p className="px-5 py-2 text-center caption-1-semibold text-text-neutral-secondary">
              *Have a nice pick*
              <br />
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

function GroupResultRow({ item }: { item: GroupResultItemT }) {
  return (
    <div className="flex flex-col gap-3 py-3">
      <PlaceLabel rank={item.rank} />

      <div className="flex items-start justify-between gap-3 px-5">
        <p className="flex-1 body-2-regular text-text-neutral-primary">{item.name}</p>
        <p className="text-[14px] leading-[22px] font-bold tracking-[-0.6px] text-text-neutral-primary">
          {formatPrice(item.price)}
        </p>
      </div>

      <ul className="flex flex-col gap-1.5 px-5">
        {item.chosenBy.map(participant => (
          <li key={participant.userId} className="flex items-center gap-2">
            <Image
              src={participant.profileImage}
              alt={participant.nickname}
              width={20}
              height={20}
              className="size-5 shrink-0 rounded-full bg-gray-50 object-cover"
              unoptimized
            />
            <span className="body-2-medium text-text-neutral-secondary">
              {participant.nickname}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupResultClient;
