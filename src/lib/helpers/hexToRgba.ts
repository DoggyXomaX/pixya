import type { TColor } from '@/types/TColor';

export const hexToRgba = (hex: string): TColor => {
  return {
    r: parseInt(hex.substring(1, 3), 16),
    g: parseInt(hex.substring(3, 5), 16),
    b: parseInt(hex.substring(5, 7), 16),
    a: 255,
  }
};