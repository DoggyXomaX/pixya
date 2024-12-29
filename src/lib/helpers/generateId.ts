import { v4 } from 'uuid';

export const generateId = (name: string) => {
  return `${name}ID_${v4()}`;
};