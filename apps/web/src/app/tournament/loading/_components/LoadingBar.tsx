'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type IconProps = { active?: boolean };

const TagIcon = (_: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.0701 21.9802C10.6601 21.9802 9.24009 21.4402 8.17009 20.3702L3.64009 15.8402C2.54009 14.7402 1.96009 13.2202 2.03009 11.6702L2.27009 6.67018C2.38009 4.28018 4.27009 2.39018 6.67009 2.27018L11.6701 2.03018C13.2201 1.97018 14.7401 2.54018 15.8401 3.64018L20.3701 8.17018C22.5201 10.3202 22.5201 13.8302 20.3701 15.9802L15.9801 20.3702C14.9001 21.4402 13.4901 21.9802 12.0701 21.9802ZM4.70009 14.7702L9.23009 19.3002C9.99009 20.0602 11.0001 20.4802 12.0701 20.4802C13.1401 20.4802 14.1501 20.0602 14.9101 19.3002L19.3001 14.9102C20.0601 14.1502 20.4801 13.1402 20.4801 12.0702C20.4801 11.0002 20.0601 9.99018 19.3001 9.23018L14.7701 4.70018C13.9701 3.90018 12.8601 3.47018 11.7401 3.53018L6.74009 3.77018C5.11009 3.84018 3.84009 5.11018 3.76009 6.73018L3.52009 11.7302C3.47009 12.8602 3.90009 13.9702 4.70009 14.7702Z" fill="white"/>
    <path d="M9.5 12.75C7.71 12.75 6.25 11.29 6.25 9.5C6.25 7.71 7.71 6.25 9.5 6.25C11.29 6.25 12.75 7.71 12.75 9.5C12.75 11.29 11.29 12.75 9.5 12.75ZM9.5 7.75C8.54 7.75 7.75 8.54 7.75 9.5C7.75 10.46 8.54 11.25 9.5 11.25C10.46 11.25 11.25 10.46 11.25 9.5C11.25 8.54 10.46 7.75 9.5 7.75Z" fill="white"/>
  </svg>
);

const StackTagIcon = ({ active }: IconProps) => {
  const fill = active ? 'white' : '#484C52';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g opacity={active ? 1 : 0.5}>
        <path d="M15.8101 20.18C15.5501 20.18 15.2801 20.17 14.9901 20.14C14.4701 20.1 13.8801 20 13.2701 19.85L11.5901 19.45C6.98007 18.36 5.47007 15.92 6.55007 11.32L7.53007 7.13001C7.75007 6.18002 8.01007 5.41002 8.33007 4.77002C10.0501 1.22002 13.3401 1.54001 15.6801 2.09001L17.3501 2.48001C19.6901 3.03001 21.1701 3.90001 22.0001 5.23002C22.8201 6.56002 22.9501 8.27001 22.4001 10.61L21.4201 14.79C20.5601 18.45 18.7701 20.18 15.8101 20.18ZM13.1201 3.25001C11.4501 3.25001 10.3901 3.94002 9.68007 5.42002C9.42007 5.96002 9.19007 6.63001 8.99007 7.47001L8.01007 11.66C7.12007 15.44 8.15007 17.09 11.9301 17.99L13.6101 18.39C14.1501 18.52 14.6601 18.6 15.1201 18.64C17.8301 18.91 19.1901 17.72 19.9501 14.45L20.9301 10.27C21.3801 8.34002 21.3201 6.99002 20.7201 6.02001C20.1201 5.05001 18.9401 4.39002 17.0001 3.94002L15.3301 3.55001C14.5001 3.35001 13.7601 3.25001 13.1201 3.25001Z" fill={fill}/>
        <path d="M8.33005 22.2502C5.76005 22.2502 4.12005 20.7102 3.07005 17.4602L1.79005 13.5102C0.370052 9.11017 1.64005 6.63017 6.02005 5.21017L7.60005 4.70017C8.12005 4.54017 8.51005 4.43017 8.86005 4.37017C9.14005 4.31017 9.43005 4.42017 9.60005 4.65017C9.77005 4.88017 9.80005 5.18017 9.68005 5.44017C9.42005 5.97017 9.19005 6.64017 9.00005 7.48017L8.02005 11.6702C7.13005 15.4502 8.16005 17.1002 11.9401 18.0002L13.6201 18.4002C14.1601 18.5302 14.6701 18.6102 15.1301 18.6502C15.4501 18.6802 15.7101 18.9002 15.8001 19.2102C15.8801 19.5202 15.7601 19.8402 15.5001 20.0202C14.8401 20.4702 14.0101 20.8502 12.9601 21.1902L11.3801 21.7102C10.2301 22.0702 9.23005 22.2502 8.33005 22.2502ZM7.78005 6.22017L6.49005 6.64017C2.92005 7.79017 2.07005 9.47017 3.22005 13.0502L4.50005 17.0002C5.66005 20.5702 7.34005 21.4302 10.9101 20.2802L12.4901 19.7602C12.5501 19.7402 12.6001 19.7202 12.6601 19.7002L11.6001 19.4502C6.99005 18.3602 5.48005 15.9202 6.56005 11.3202L7.54005 7.13017C7.61005 6.81017 7.69005 6.50017 7.78005 6.22017Z" fill={fill}/>
      </g>
    </svg>
  );
};

const BookmarkCheckIcon = ({ active }: IconProps) => {
  const fill = active ? 'white' : '#484C52';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g opacity={active ? 1 : 0.5}>
        <path d="M4.93006 22.75C4.51006 22.75 4.12006 22.65 3.77006 22.45C3.00006 22 2.56006 21.09 2.56006 19.96V5.86C2.56006 3.32 4.63006 1.25 7.17006 1.25H16.8201C19.3601 1.25 21.4301 3.32 21.4301 5.86V19.95C21.4301 21.08 20.9901 21.99 20.2201 22.44C19.4501 22.89 18.4401 22.84 17.4501 22.29L12.5701 19.58C12.2801 19.42 11.7101 19.42 11.4201 19.58L6.54006 22.29C6.00006 22.59 5.45006 22.75 4.93006 22.75ZM7.18006 2.75C5.47006 2.75 4.07006 4.15 4.07006 5.86V19.95C4.07006 20.54 4.24006 20.98 4.54006 21.15C4.84006 21.32 5.31006 21.27 5.82006 20.98L10.7001 18.27C11.4401 17.86 12.5601 17.86 13.3001 18.27L18.1801 20.98C18.6901 21.27 19.1601 21.33 19.4601 21.15C19.7601 20.97 19.9301 20.53 19.9301 19.95V5.86C19.9301 4.15 18.5301 2.75 16.8201 2.75H7.18006Z" fill={fill}/>
        <path d="M11.0898 13.2499C10.8998 13.2499 10.7098 13.1799 10.5598 13.0299L9.05979 11.5299C8.76979 11.2399 8.76979 10.7599 9.05979 10.4699C9.34979 10.1799 9.82978 10.1799 10.1198 10.4699L11.0898 11.4399L14.5598 7.96994C14.8498 7.67994 15.3298 7.67994 15.6198 7.96994C15.9098 8.25994 15.9098 8.73994 15.6198 9.02994L11.6198 13.0299C11.4698 13.1799 11.2798 13.2499 11.0898 13.2499Z" fill={fill}/>
      </g>
    </svg>
  );
};

// 원 반지름 고정 (디자인 기준)
const R = 21.5645;
const SVG_H = R * 2; // ≈ 43.13px
const kR = 0.5522847498 * R;

// 원↔바 연결 곡선 오프셋 (원본 SVG에서 추출)
const INN_DX = 19.176, INN_DY = 9.871;
const OUT_DX = 24.239, BAR_HH = 6.484;
const C1_DX = 20.177, C1_DY = 7.929, C2_DX = 22.056;
const A_C1 = 8.352, A_C2_DX = 15.594, A_C2_DY = 4.748;

// 너비에 맞게 경로를 동적 생성 — 원은 고정 크기, 바만 늘어남
const generateBonePath = (W: number): string => {
  const cx1 = R, cx2 = W / 2, cx3 = W - R, H = SVG_H;
  const n = (v: number) => +v.toFixed(4);
  const pt = (x: number, y: number) => `${n(x)} ${n(y)}`;
  const c = (x1: number, y1: number, x2: number, y2: number, x: number, y: number) =>
    `C${pt(x1, y1)} ${pt(x2, y2)} ${pt(x, y)}`;
  return [
    `M${pt(cx3, 0)}`,
    c(cx3+kR,0, cx3+R,R-kR, cx3+R,R), c(cx3+R,R+kR, cx3+kR,H, cx3,H),
    c(cx3-A_C1,H, cx3-A_C2_DX,H-A_C2_DY, cx3-INN_DX,R+INN_DY),
    c(cx3-C1_DX,R+C1_DY, cx3-C2_DX,R+BAR_HH, cx3-OUT_DX,R+BAR_HH),
    `H${n(cx2+OUT_DX)}`,
    c(cx2+C2_DX,R+BAR_HH, cx2+C1_DX,R+C1_DY, cx2+INN_DX,R+INN_DY),
    c(cx2+A_C2_DX,H-A_C2_DY, cx2+A_C1,H, cx2,H),
    c(cx2-A_C1,H, cx2-A_C2_DX,H-A_C2_DY, cx2-INN_DX,R+INN_DY),
    c(cx2-C1_DX,R+C1_DY, cx2-C2_DX,R+BAR_HH, cx2-OUT_DX,R+BAR_HH),
    `H${n(cx1+OUT_DX)}`,
    c(cx1+C2_DX,R+BAR_HH, cx1+C1_DX,R+C1_DY, cx1+INN_DX,R+INN_DY),
    c(cx1+A_C2_DX,H-A_C2_DY, cx1+A_C1,H, cx1,H),
    c(cx1-kR,H, cx1-R,R+kR, cx1-R,R), c(cx1-R,R-kR, cx1-kR,0, cx1,0),
    c(cx1+A_C1,0, cx1+A_C2_DX,A_C2_DY, cx1+INN_DX,R-INN_DY),
    c(cx1+C1_DX,R-C1_DY, cx1+C2_DX,R-BAR_HH, cx1+OUT_DX,R-BAR_HH),
    `H${n(cx2-OUT_DX)}`,
    c(cx2-C2_DX,R-BAR_HH, cx2-C1_DX,R-C1_DY, cx2-INN_DX,R-INN_DY),
    c(cx2-A_C2_DX,A_C2_DY, cx2-A_C1,0, cx2,0),
    c(cx2+A_C1,0, cx2+A_C2_DX,A_C2_DY, cx2+INN_DX,R-INN_DY),
    c(cx2+C1_DX,R-C1_DY, cx2+C2_DX,R-BAR_HH, cx2+OUT_DX,R-BAR_HH),
    `H${n(cx3-OUT_DX)}`,
    c(cx3-C2_DX,R-BAR_HH, cx3-C1_DX,R-C1_DY, cx3-INN_DX,R-INN_DY),
    c(cx3-A_C2_DX,A_C2_DY, cx3-A_C1,0, cx3,0),
    'Z',
  ].join('');
};

const DURATION = 6000;
const ICONS = [TagIcon, StackTagIcon, BookmarkCheckIcon] as const;
const getThresholds = (W: number) => [0, (W / 2 - R) / W, (W - 2 * R) / W];

export default function LoadingBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillClipRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [nodeActive, setNodeActive] = useState([true, false, false]);

  useLayoutEffect(() => {
    setContainerWidth(containerRef.current?.clientWidth ?? 0);
  }, []);

  useEffect(() => {
    if (!containerWidth) return;
    const thresholds = getThresholds(containerWidth);
    const start = performance.now();
    let raf: number;
    const activated = [true, false, false];

    const animate = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);

      if (fillClipRef.current) {
        fillClipRef.current.style.width = `${progress * containerWidth}px`;
      }

      let changed = false;
      thresholds.forEach((threshold: number, i: number) => {
        if (!activated[i] && progress >= threshold) {
          activated[i] = true;
          changed = true;
        }
      });
      if (changed) setNodeActive([...activated]);

      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [containerWidth]);

  const bonePath = containerWidth > 0 ? generateBonePath(containerWidth) : '';
  const circleCentersX = [R, containerWidth / 2, containerWidth - R];

  return (
    <div className="flex flex-col gap-[14.32px]">
      <p className="text-base font-medium leading-5 tracking-[-0.15px] text-[#6F6F6F]">선택한 위시템 불러오는 중...</p>
      <div ref={containerRef} className="relative w-full">
        {containerWidth > 0 && (
          <>
            {/* 회색 본 모양 배경 */}
            <svg width={containerWidth} height={SVG_H} viewBox={`0 0 ${containerWidth} ${SVG_H}`} fill="none" style={{ display: 'block' }}>
              <path d={bonePath} fill="#E5E7EB" />
            </svg>

            {/* 어두운 본 모양 — 왼쪽부터 클립으로 채워짐 */}
            <div
              ref={fillClipRef}
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: 0 }}
            >
              <svg width={containerWidth} height={SVG_H} viewBox={`0 0 ${containerWidth} ${SVG_H}`} fill="none" style={{ display: 'block' }}>
                <path d={bonePath} fill="#171719" />
              </svg>
            </div>

            {/* 아이콘 — 원 중심 위에 절대 배치 */}
            {ICONS.map((Icon, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: circleCentersX[i] }}
              >
                <Icon active={nodeActive[i]} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
