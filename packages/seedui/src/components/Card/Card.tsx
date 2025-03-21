import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

import { StyledComponentsPrefix } from '../../types';

export type CardVariants = 'default' | 'outlined';

export interface CardProps {
  htmlAttributes?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
  };
  children?: ReactNode;
  variant?: CardVariants;
}

const CardDiv = styled.div<StyledComponentsPrefix<Required<CardProps>>>(({ theme, $variant }) => {
  const isLight = theme.mode === 'light';

  return {
    display: 'block',
    width: 'fit-content',
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[800],
    borderRadius: theme.borderRadius['075'],
    boxShadow: `10px 8px 13px -13px rgba(0,0,0, ${isLight ? '0.1' : '1'})`,
    border:
      $variant === 'outlined' ? `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[600]}` : 'none',
  };
});

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = 'default', htmlAttributes: { rootDiv: rootDivHTMLAttributes } = {}, children }: CardProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <CardDiv {...rootDivHTMLAttributes} $variant={variant} ref={forwardedRef}>
        {children}
      </CardDiv>
    );
  },
);

Card.displayName = 'Card';
