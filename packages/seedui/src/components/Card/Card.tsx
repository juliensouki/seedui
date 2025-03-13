import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

export type CardVariants = 'default' | 'outlined';

export interface CardProps {
  divProps?: HTMLAttributes<HTMLDivElement>;
  children?: ReactNode;
  variant?: CardVariants;
}

const CardDiv = styled.div<Required<CardProps>>((props) => {
  const theme = props.theme;
  const isLight = theme.mode === 'light';

  return {
    display: 'block',
    width: 'fit-content',
    backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[800],
    borderRadius: theme.borderRadius['075'],
    boxShadow: `10px 8px 13px -13px rgba(0,0,0, ${isLight ? '0.1' : '1'})`,
    border:
      props.variant === 'outlined'
        ? `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[600]}`
        : 'none',
  };
});

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', divProps, children }: CardProps, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    return (
      <CardDiv {...divProps} variant={variant} ref={forwardedRef}>
        {children}
      </CardDiv>
    );
  },
);

Card.displayName = 'Card';
