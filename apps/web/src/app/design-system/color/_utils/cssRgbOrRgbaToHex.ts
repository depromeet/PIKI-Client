const clamp255 = (channel: number): number => Math.max(0, Math.min(255, Math.round(channel)));

const byteToHex = (value: number): string => clamp255(value).toString(16).padStart(2, '0');

/** `getComputedStyle(...).backgroundColor` 등 `rgb()` / `rgba()` 문자열을 Hex로 변환 */
export const cssRgbOrRgbaToHex = (input: string): string => {
  const trimmed = input.trim();
  if (trimmed === 'transparent') return 'TRANSPARENT';

  const match = trimmed.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i
  );
  if (!match) return trimmed;

  const red = Number(match[1]);
  const green = Number(match[2]);
  const blue = Number(match[3]);
  const alphaRaw = match[4];

  if (alphaRaw !== undefined) {
    const alpha = Number(alphaRaw);
    if (alpha < 1)
      return `#${byteToHex(red)}${byteToHex(green)}${byteToHex(blue)}${byteToHex(alpha * 255)}`.toUpperCase();
  }

  return `#${byteToHex(red)}${byteToHex(green)}${byteToHex(blue)}`.toUpperCase();
};
