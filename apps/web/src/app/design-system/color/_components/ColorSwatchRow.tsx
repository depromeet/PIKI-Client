'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { cssRgbOrRgbaToHex } from '@/app/design-system/color/_utils/cssRgbOrRgbaToHex';
import {
  type ThemeColorEntryT,
  type ThemeTokenGroupT,
  directAtomicColorTokenFromVarRaw,
  toTailwindBgClass,
} from '@/app/design-system/color/_utils/parseThemeColorsFromGlobals';
import { cn } from '@/utils/cn';

const semanticAtomicRefLabel = (raw: string): string => {
  const refToken = directAtomicColorTokenFromVarRaw(raw);
  return refToken ?? (raw.trim().startsWith('#') ? raw.trim().toUpperCase() : '—');
};

type Props = {
  entry: ThemeColorEntryT;
  tokenGroup: ThemeTokenGroupT;
};

function ColorSwatchRow({ entry, tokenGroup }: Props) {
  const swatchRef = useRef<HTMLDivElement>(null);
  const [hexFromDom, setHexFromDom] = useState('…');
  const tailwindBgClass = toTailwindBgClass(entry.swatchKey);

  useLayoutEffect(() => {
    const node = swatchRef.current;
    if (!node) return;
    const rgb = getComputedStyle(node).backgroundColor;
    setHexFromDom(cssRgbOrRgbaToHex(rgb));
  }, [tailwindBgClass]);

  return (
    <li className="flex flex-wrap items-start gap-4 border-b border-[rgba(112,115,124,0.15)] py-4 last:border-b-0">
      <div
        ref={swatchRef}
        className={cn(
          'size-11 shrink-0 rounded-full border border-[rgba(112,115,124,0.25)] shadow-sm',
          tailwindBgClass
        )}
        aria-hidden
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-start sm:gap-8">
        <div className="min-w-0 flex-1">
          <p className="body-1-semibold text-[#171719]">{entry.swatchKey}</p>
          <p className="font-mono caption-1-regular wrap-break-word text-[rgba(55,56,60,0.61)]">
            {entry.cssVar}
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:max-w-[220px]">
          <span className="caption-1-semibold text-[rgba(55,56,60,0.61)]">Hex</span>
          <span className="font-mono body-1-semibold wrap-break-word text-[#171719]">
            {hexFromDom}
          </span>
        </div>
        {tokenGroup === 'semantic' ? (
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="caption-1-semibold text-[rgba(55,56,60,0.61)]">참조</span>
            <p className="font-mono body-1-semibold wrap-break-word text-[#171719]">
              {semanticAtomicRefLabel(entry.raw)}
            </p>
          </div>
        ) : null}
      </div>
    </li>
  );
}

export default ColorSwatchRow;
