export const stubNumber = (value: unknown, defaults: number = 0) => {
  if (typeof value !== 'number') return defaults;
  if (Number.isNaN(value)) return defaults;
  if (!Number.isFinite(value)) return defaults;
  return value;
};