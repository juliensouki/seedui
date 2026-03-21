import { BorderRadius } from '../../types';

const BASE_SIZE = 2;
const FULL_VALUE = 9999;

export const borderRadius: BorderRadius = (factor: number | 'full') => {
  if (factor === 'full') return FULL_VALUE;
  return BASE_SIZE * factor;
};
