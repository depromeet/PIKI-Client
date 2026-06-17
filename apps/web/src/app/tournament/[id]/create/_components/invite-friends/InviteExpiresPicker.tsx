'use client';

import { useState } from 'react';

import Button from '@/components/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from '@/components/drawer';

import WheelColumn from './WheelColumn';

type InviteExpiresPickerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 현재 마감 시각 (ISO 8601) — picker 진입 시 기본값으로 사용 */
  initialExpiresAt?: string;
  /** 확인 시 새 마감 시각(ISO 8601) 전달 */
  onConfirm: (newExpiresAt: string) => void;
  /** 변경 요청 중 여부 — 확인 버튼 비활성 표시 */
  isPending?: boolean;
};

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
const MERIDIEMS = ['AM', 'PM'] as const;
type MeridiemT = (typeof MERIDIEMS)[number];

/**
 * Date → 로컬 LocalDateTime 문자열 (시간대 정보 없는 ISO).
 * 서버가 `LocalDateTime` 으로 받으므로 `toISOString()` 의 UTC `Z` 접미사를 피한다.
 * 예: "2026-06-18T14:30:00"
 */
const toLocalDateTimeString = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0');
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mi = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}`;
};

/** 12시간제 시(1~12) + AM/PM → 0~23 시 */
const to24Hour = (hour12: number, meridiem: MeridiemT) => {
  if (meridiem === 'AM') return hour12 === 12 ? 0 : hour12;
  return hour12 === 12 ? 12 : hour12 + 12;
};

/** 0~23 시 → 12시간제 시(1~12) + AM/PM */
const from24Hour = (hour24: number): { hour12: number; meridiem: MeridiemT } => {
  const meridiem: MeridiemT = hour24 < 12 ? 'AM' : 'PM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return { hour12, meridiem };
};

/** ISO 시각을 picker 의 초기 hour12/minute/meridiem 인덱스로 변환 */
const parseInitial = (
  initialExpiresAt: string | undefined
): { hourIndex: number; minuteIndex: number; meridiemIndex: number } => {
  const base = (() => {
    if (!initialExpiresAt) return new Date(Date.now() + 30 * 60 * 1000); // 기본 30분 후
    const d = new Date(initialExpiresAt);
    return Number.isNaN(d.getTime()) ? new Date(Date.now() + 30 * 60 * 1000) : d;
  })();
  const { hour12, meridiem } = from24Hour(base.getHours());
  return {
    hourIndex: hour12 - 1,
    minuteIndex: base.getMinutes(),
    meridiemIndex: MERIDIEMS.indexOf(meridiem),
  };
};

function InviteExpiresPicker({
  open,
  onOpenChange,
  initialExpiresAt,
  onConfirm,
  isPending = false,
}: InviteExpiresPickerProps) {
  // 마운트 시점 한 번만 initial 계산 — 부모가 open 토글마다 key 로 다시 마운트시킴.
  const [hourIndex, setHourIndex] = useState(() => parseInitial(initialExpiresAt).hourIndex);
  const [minuteIndex, setMinuteIndex] = useState(() => parseInitial(initialExpiresAt).minuteIndex);
  const [meridiemIndex, setMeridiemIndex] = useState(
    () => parseInitial(initialExpiresAt).meridiemIndex
  );

  const handleConfirm = () => {
    const hour12 = hourIndex + 1;
    const minute = minuteIndex;
    const meridiem = MERIDIEMS[meridiemIndex] ?? 'AM';
    const hour24 = to24Hour(hour12, meridiem);

    // 오늘 날짜 + 선택한 시:분. 이미 지난 시각이면 다음날로 자동 보정.
    const now = new Date();
    const next = new Date(now);
    next.setHours(hour24, minute, 0, 0);
    if (next.getTime() <= now.getTime()) {
      next.setDate(next.getDate() + 1);
    }
    onConfirm(toLocalDateTimeString(next));
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <DrawerTitle className="heading-1 text-text-neutral-primary">
              초대 마감 시각 변경
            </DrawerTitle>
            <DrawerDescription className="body-1-medium text-text-neutral-tertiary">
              친구가 후보를 담을 수 있는 시각을 정해주세요.
            </DrawerDescription>
          </div>

          <div className="flex w-full items-center justify-center gap-2 px-4">
            <WheelColumn items={HOURS} selectedIndex={hourIndex} onChange={setHourIndex} />
            <span className="body-1-bold text-text-neutral-primary">:</span>
            <WheelColumn items={MINUTES} selectedIndex={minuteIndex} onChange={setMinuteIndex} />
            <WheelColumn
              items={[...MERIDIEMS]}
              selectedIndex={meridiemIndex}
              onChange={setMeridiemIndex}
            />
          </div>

          <Button
            size="lg"
            variant="primary"
            className="w-full"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? '변경하는 중...' : '확인'}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default InviteExpiresPicker;
