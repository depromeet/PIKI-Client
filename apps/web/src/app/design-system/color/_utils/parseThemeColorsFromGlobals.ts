export type ThemeTokenGroupT = 'atomic' | 'semantic';

export type ThemeColorEntryT = {
  cssVar: string;
  /** `--color-` 제거한 토큰 (예: `gray-700`, `bg-accent`) */
  swatchKey: string;
  raw: string;
  resolved: string;
};

const COLOR_DECL_REGEX = /--(color-[a-z0-9-]+)\s*:\s*([^;]+);/g;

const VAR_REF_REGEX = /^var\(\s*(--color-[a-z0-9-]+)\s*\)$/;

export const ATOMIC_FAMILY_ORDER = [
  'base',
  'gray',
  'blue',
  'red',
  'green',
  'yellow',
  'orange',
  'purple',
] as const;

const sliceAtThemeBlock = (css: string): string => {
  const themeKeyword = '@theme';
  const start = css.indexOf(themeKeyword);
  if (start === -1) return css;
  const openBrace = css.indexOf('{', start);
  if (openBrace === -1) return '';
  let depth = 1;
  for (let index = openBrace + 1; index < css.length; index += 1) {
    const char = css[index];
    if (char === '{') depth += 1;
    else if (char === '}') {
      depth -= 1;
      if (depth === 0) return css.slice(openBrace + 1, index);
    }
  }
  return '';
};

/** @theme 블록에서 `--color-*` 선언만 추출 */
export const extractColorDeclarations = (css: string): Map<string, string> => {
  const map = new Map<string, string>();
  const themeInner = sliceAtThemeBlock(css);
  if (!themeInner) return map;

  let match = COLOR_DECL_REGEX.exec(themeInner);
  while (match !== null) {
    const namePart = match[1];
    const valuePart = match[2];
    if (!namePart || valuePart === undefined) {
      match = COLOR_DECL_REGEX.exec(themeInner);
      continue;
    }
    const fullName = `--${namePart}`;
    map.set(fullName, valuePart.trim());
    match = COLOR_DECL_REGEX.exec(themeInner);
  }
  COLOR_DECL_REGEX.lastIndex = 0;
  return map;
};

const resolveOne = (
  raw: string,
  lookup: ReadonlyMap<string, string>,
  chain: Set<string>
): string => {
  const trimmed = raw.trim();
  const refMatch = trimmed.match(VAR_REF_REGEX);
  if (!refMatch) return trimmed;

  const refKey = refMatch[1];
  if (!refKey || chain.has(refKey)) return trimmed;
  const next = lookup.get(refKey);
  if (!next) return trimmed;

  const nextChain = new Set(chain);
  nextChain.add(refKey);
  return resolveOne(next, lookup, nextChain);
};

export const resolveThemeColorValue = (raw: string, lookup: ReadonlyMap<string, string>): string =>
  resolveOne(raw, lookup, new Set());

export const toSwatchKey = (cssVar: string): string =>
  cssVar.startsWith('--color-') ? cssVar.slice('--color-'.length) : cssVar;

/** `var(--color-blue-500)` → 직접 참조 atomic 토큰 이름 `blue-500` */
export const directAtomicColorTokenFromVarRaw = (raw: string): string | null => {
  const match = raw.trim().match(/^var\(\s*--color-([a-z0-9-]+)\s*\)$/i);
  return match?.[1] ?? null;
};

/** `@theme` 토큰 키(`gray-700`, `bg-accent` 등)에 대응하는 배경 유틸 클래스 */
export const toTailwindBgClass = (swatchKey: string): string => `bg-${swatchKey}`;

const shadeRank = (swatchKey: string): number => {
  const match = /-(\d+)$/.exec(swatchKey);
  if (!match?.[1]) return 0;
  return Number.parseInt(match[1], 10);
};

const sortAtomicWithinFamily = (entries: ThemeColorEntryT[]): ThemeColorEntryT[] =>
  [...entries].sort((entryA, entryB) => shadeRank(entryA.swatchKey) - shadeRank(entryB.swatchKey));

export const groupThemeColors = (
  entries: ThemeColorEntryT[]
): { atomic: Record<string, ThemeColorEntryT[]>; semantic: ThemeColorEntryT[] } => {
  const atomic: Record<string, ThemeColorEntryT[]> = {};
  for (const family of ATOMIC_FAMILY_ORDER) atomic[family] = [];

  const semantic: ThemeColorEntryT[] = [];

  for (const entry of entries) {
    const { swatchKey } = entry;
    const family = swatchKey.split('-')[0] ?? '';
    if ((ATOMIC_FAMILY_ORDER as readonly string[]).includes(family)) {
      atomic[family]?.push(entry);
    } else {
      semantic.push(entry);
    }
  }

  for (const family of ATOMIC_FAMILY_ORDER) {
    atomic[family] = sortAtomicWithinFamily(atomic[family] ?? []);
  }

  semantic.sort((entryA, entryB) => entryA.swatchKey.localeCompare(entryB.swatchKey));
  return { atomic, semantic };
};

const SEMANTIC_KIND_ORDER = ['bg', 'text', 'border', 'icon'] as const;

export type SemanticKindT = (typeof SEMANTIC_KIND_ORDER)[number];

export const groupSemanticByKind = (
  semantic: ThemeColorEntryT[]
): Partial<Record<SemanticKindT, ThemeColorEntryT[]>> => {
  const bucket: Partial<Record<SemanticKindT, ThemeColorEntryT[]>> = {};
  for (const kind of SEMANTIC_KIND_ORDER) bucket[kind] = [];

  for (const entry of semantic) {
    const kind = entry.swatchKey.split('-')[0] as SemanticKindT | undefined;
    if (kind && SEMANTIC_KIND_ORDER.includes(kind)) bucket[kind]?.push(entry);
  }

  for (const kind of SEMANTIC_KIND_ORDER) {
    bucket[kind]?.sort((entryA, entryB) => entryA.swatchKey.localeCompare(entryB.swatchKey));
  }

  return bucket;
};

export const buildThemeColorEntries = (css: string): ThemeColorEntryT[] => {
  const lookup = extractColorDeclarations(css);
  const result: ThemeColorEntryT[] = [];

  for (const [cssVar, raw] of lookup) {
    result.push({
      cssVar,
      swatchKey: toSwatchKey(cssVar),
      raw,
      resolved: resolveThemeColorValue(raw, lookup),
    });
  }

  return result.sort((entryA, entryB) => entryA.swatchKey.localeCompare(entryB.swatchKey));
};
