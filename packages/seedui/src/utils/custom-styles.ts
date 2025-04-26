import styled from 'styled-components';
import { StyledComponent, StyledProps } from '../types/internal';
import { CustomComponents } from '../types';

export const applyCustomStyles = <T>(
  base: StyledComponent<T>,
  component: keyof CustomComponents,
): StyledComponent<T> => {
  return styled(base)((props: StyledProps<T>) => ({
    ...props.theme?.components?.[component]?.styles,
  }));
};
