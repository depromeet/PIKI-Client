'use client';

import {
  ATOMIC_FAMILY_ORDER,
  type SemanticKindT,
  type ThemeColorEntryT,
  type ThemeTokenGroupT,
  groupSemanticByKind,
  groupThemeColors,
} from '@/app/design-system/color/_utils/parseThemeColorsFromGlobals';

import ColorSwatchRow from './ColorSwatchRow';

const SEMANTIC_SECTION_LABEL: Record<SemanticKindT, string> = {
  bg: 'Background (bg-*)',
  text: 'Text (text-*)',
  border: 'Border (border-*)',
  icon: 'Icon (text-* / fill)',
};

type ColorSectionProps = {
  title: string;
  entries: ThemeColorEntryT[];
  tokenGroup: ThemeTokenGroupT;
};

function ColorSection({ title, entries, tokenGroup }: ColorSectionProps) {
  if (entries.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-[18px] leading-[1.334] font-bold tracking-[-0.45px] text-black">
        {title}
      </h3>
      <ul className="flex flex-col rounded-2xl border border-[rgba(112,115,124,0.22)] px-4 sm:px-6">
        {entries.map(entry => (
          <ColorSwatchRow key={entry.cssVar} entry={entry} tokenGroup={tokenGroup} />
        ))}
      </ul>
    </section>
  );
}

type ColorDocsClientProps = {
  entries: ThemeColorEntryT[];
};

function ColorDocsClient({ entries }: ColorDocsClientProps) {
  const { atomic, semantic } = groupThemeColors(entries);
  const semanticByKind = groupSemanticByKind(semantic);

  return (
    <div className="mx-auto flex max-w-[min(100%,960px)] flex-col gap-12 px-4 py-8 sm:gap-16 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-[28px] leading-[1.334] font-bold tracking-[-0.78px] text-black sm:text-[36px] sm:tracking-[-0.972px]">
          Color
        </h1>
      </header>

      <section className="flex flex-col gap-10">
        <h2 className="text-[20px] leading-[1.334] font-bold tracking-[-0.45px] text-black sm:text-[24px] sm:tracking-[-0.552px]">
          Atomic
        </h2>
        <div className="flex flex-col gap-10">
          {ATOMIC_FAMILY_ORDER.map(family => (
            <ColorSection
              key={family}
              title={family.charAt(0).toUpperCase() + family.slice(1)}
              entries={atomic[family] ?? []}
              tokenGroup="atomic"
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <h2 className="text-[20px] leading-[1.334] font-bold tracking-[-0.45px] text-black sm:text-[24px] sm:tracking-[-0.552px]">
          Semantic
        </h2>
        <div className="flex flex-col gap-10">
          {(['bg', 'text', 'border', 'icon'] as const).map(kind => (
            <ColorSection
              key={kind}
              title={SEMANTIC_SECTION_LABEL[kind]}
              entries={semanticByKind[kind] ?? []}
              tokenGroup="semantic"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ColorDocsClient;
