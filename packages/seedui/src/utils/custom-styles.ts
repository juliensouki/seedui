import styled from 'styled-components';

import { StyledComponent, StyledProps } from '../types/internal';
import { CustomComponents, Theme } from '../types';

const remove$ = (property: string, value: unknown): { [key: string]: unknown } => {
  if (property[0] === '$') {
    return { [property.slice(1)]: value };
  }
  return { [property]: value };
};

// styled-components require to prefix props with $ for them not to be forwarded to the DOM.
// We need to get rid of these.
const cleanSCProps = (obj: { [key: string]: unknown }): { [key: string]: unknown } => {
  let result: { [key: string]: unknown } = {};

  for (const [key, value] of Object.entries(obj)) {
    result = { ...result, ...remove$(key, value) };
  }

  return result;
};

export const applyCustomStyles = <T>(
  base: StyledComponent<T>,
  component: keyof CustomComponents,
): StyledComponent<T> => {
  return styled(base)((styledProps: StyledProps<T>) => ({
    ...styledProps.theme?.components?.[component]?.styles,
    ...styledProps.theme?.components?.[component]?.conditionalStyles?.reduce((acc, { styles, condition }) => {
      const { theme, ...prefixedProps } = styledProps;

      if ((condition as (props: T, theme: Theme) => boolean)(cleanSCProps(prefixedProps) as T, theme) === true) {
        return { ...acc, ...styles };
      }
      return acc;
    }, {}),
  }));
};
