export const joinClasses = (...classes: (string | undefined)[]): string =>
  classes.filter((classes) => classes !== undefined).join(' ');
