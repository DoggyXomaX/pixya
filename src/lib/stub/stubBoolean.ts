export const stubBoolean = (value: unknown, defaults: boolean = false) => {
  return typeof value === 'boolean' ? value : defaults;
};