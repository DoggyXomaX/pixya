export const clamp = (v: number, min: number, max: number) => {
  if (v < min) return min;
  if (v > max) return max;
  return v;
};

export const clamp01 = (v: number) => {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
};

export const lerpf = (a: number, b: number, t: number) => a + (b - a) * t;
export const lerp = (a: number, b: number, t: number) => {
  if (t < 0) t = 0;
  if (t > 1) t = 1;
  return a - (b - a) * t;
};