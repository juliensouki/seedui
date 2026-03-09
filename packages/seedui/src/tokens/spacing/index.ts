import { Spacing } from '../../types';

const BASE_SIZE = 8;

export const spacing: Spacing = (factor: number) => BASE_SIZE * factor;
