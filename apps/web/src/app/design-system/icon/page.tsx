'use client';

import { useState } from 'react';

import * as FillIcons from '@/assets/icons/fill';
import * as OutlineIcons from '@/assets/icons/outline';

const SIZES = [16, 20, 24, 32, 40] as const;
const COLORS = [
  { label: 'default', class: '' },
  { label: 'text-red-500', class: 'text-red-500' },
  { label: 'text-blue-500', class: 'text-blue-500' },
  { label: 'text-green-500', class: 'text-green-500' },
  { label: 'text-black', class: 'text-black' },
] as const;

const fillEntries = Object.entries(FillIcons) as [string, React.FC<React.SVGProps<SVGSVGElement>>][];

const iconNames = fillEntries.map(([key]) => key.replace(/IconFill$/, ''));

function IconDocsPage() {
  const [size, setSize] = useState<(typeof SIZES)[number]>(40);
  const [color, setColor] = useState<(typeof COLORS)[number]>(COLORS[0]);

  return (
    <div className="min-h-dvh p-8 text-black">
      <h1 className="mb-8 text-2xl font-bold">Icons</h1>

      <div className="mb-6 flex flex-wrap gap-8">
        <div>
          <p className="mb-2 text-sm font-medium">Size</p>
          <div className="flex gap-2">
            {SIZES.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded-lg border px-3 py-1 text-sm ${size === s ? 'border-black bg-black text-white' : 'border-gray-300'}`}
              >
                {s}px
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Color (Tailwind)</p>
          <div className="flex gap-2">
            {COLORS.map(c => (
              <button
                key={c.label}
                type="button"
                onClick={() => setColor(c)}
                className={`rounded-lg border px-3 py-1 text-sm ${color.label === c.label ? 'border-black bg-black text-white' : 'border-gray-300'}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {iconNames.map(name => {
          const FillIcon = FillIcons[`${name}IconFill` as keyof typeof FillIcons] as React.FC<React.SVGProps<SVGSVGElement>> | undefined;
          const OutlineIcon = OutlineIcons[`${name}IconOutline` as keyof typeof OutlineIcons] as React.FC<React.SVGProps<SVGSVGElement>> | undefined;

          return (
            <div key={name} className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-400">{name.replace(/([A-Z])/g, m => `-${m.toLowerCase()}`).replace(/^-/, '')}</p>
              <div className={`flex gap-4 ${color.class}`}>
                {FillIcon && (
                  <div className="flex flex-col items-center gap-1">
                    <FillIcon width={size} height={size} />
                    <span className="text-[10px] text-gray-400">fill</span>
                  </div>
                )}
                {OutlineIcon && (
                  <div className="flex flex-col items-center gap-1">
                    <OutlineIcon width={size} height={size} />
                    <span className="text-[10px] text-gray-400">outline</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IconDocsPage;
