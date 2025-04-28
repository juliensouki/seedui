import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';

import { InternalProps, StyledComponentsPrefix } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';

export type CardVariants = 'default' | 'outlined';

export interface CardProps {
  htmlAttributes?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
  };
  children?: ReactNode;
  variant?: CardVariants;
}

const defaultProps: CardProps = {
  variant: 'default',
  htmlAttributes: {
    rootDiv: {},
  },
};

const CardDiv = applyCustomStyles(
  styled.div<StyledComponentsPrefix<Required<CardProps>>>(({ theme, $variant }) => {
    const isLight = theme.mode === 'light';

    return {
      display: 'block',
      width: 'fit-content',
      backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[800],
      borderRadius: theme.borderRadius['075'],
      boxShadow: `10px 8px 13px -13px rgba(0,0,0, ${isLight ? '0.1' : '1'})`,
      border:
        $variant === 'outlined'
          ? `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[600]}`
          : 'none',
    };
  }),
  'card',
);

export const Card = forwardRef<HTMLDivElement, CardProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const theme = useTheme();
    const {
      variant,
      className,
      htmlAttributes: { rootDiv: rootDivHTMLAttributes } = {},
      children,
    } = getDefaultProps<CardProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: theme?.components?.card?.defaultProps,
      defaultProps,
    });

    return (
      <CardDiv
        {...rootDivHTMLAttributes}
        $variant={variant}
        className={joinClasses(className, rootDivHTMLAttributes?.className)}
        ref={forwardedRef}
      >
        {children}
      </CardDiv>
    );
  },
);

Card.displayName = 'Card';
