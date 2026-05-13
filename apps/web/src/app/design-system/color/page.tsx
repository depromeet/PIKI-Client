import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { buildThemeColorEntries } from '@/app/design-system/color/_utils/parseThemeColorsFromGlobals';

import ColorDocsClient from './_components/ColorDocsClient';
import ThemeColorTailwindSafelist from './_components/ThemeColorTailwindSafelist';

const GLOBALS_CSS_PATH = path.join(process.cwd(), 'src/styles/globals.css');

async function ColorDocsPage() {
  const css = await readFile(GLOBALS_CSS_PATH, 'utf8');
  const entries = buildThemeColorEntries(css);

  return (
    <div className="text-black">
      <ThemeColorTailwindSafelist />
      <ColorDocsClient entries={entries} />
    </div>
  );
}

export default ColorDocsPage;
