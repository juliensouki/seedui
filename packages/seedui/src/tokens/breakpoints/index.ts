import { BreakpointKeys, Breakpoints } from '../../types';

export const createBreakpointHelpers = (values: BreakpointKeys) => ({
  up: (key: keyof BreakpointKeys): string =>
    `@media (min-width: ${values[key]}px)`,

  down: (key: keyof BreakpointKeys): string =>
    `@media (max-width: ${values[key] - 0.02}px)`,

  between: (start: keyof BreakpointKeys, end: keyof BreakpointKeys): string =>
    `@media (min-width: ${values[start]}px) and (max-width: ${values[end] - 0.02}px)`,
});

const values: BreakpointKeys = {
  xs: 450,
  sm: 600,
  md: 960,
  lg: 1200,
  xl: 1550,
};

export const breakpoints: Breakpoints = {
  ...values,
  mobile: 'sm',
  tablet: 'md',
  desktop: 'lg',
  ...createBreakpointHelpers(values),
};
