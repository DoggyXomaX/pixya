import type { TColor } from '@/types/TColor';

const $ = (n: number) => n > 0xf ? n.toString(16) : `0${n.toString(16)}`;
export const rgbaToRgbHex = (color: TColor) => {
  return `#${$(color.r)}${$(color.g)}${$(color.b)}`;
};