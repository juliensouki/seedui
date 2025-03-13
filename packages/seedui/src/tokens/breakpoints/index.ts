import { Breakpoints } from '../../types';

export const breakpoints: Breakpoints = {
  xs: 450,
  sm: 600,
  md: 960,
  lg: 1200,
  xl: 1550,
};

export const tabletBreakpoint: keyof Breakpoints = 'md';
export const mobileBreakpoint: keyof Breakpoints = 'sm';
