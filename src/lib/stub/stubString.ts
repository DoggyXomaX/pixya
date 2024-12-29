export const stubString = (value: unknown, defaults: string = ''): string => {
  return typeof value === 'string' ? value : defaults;
};