import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode, useContext } from 'react';
import styled from 'styled-components';

import { InternalProps, StyledComponentsPrefix } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContextType } from '../../types';
import { SeedContext } from '../ThemeProvider/context';

export type CardVariants = 'default' | 'outlined';

/** A container that visually separates content with an elevated or outlined appearance. */
export interface CardProps {
  /** Access the root DOM element for custom attributes or event handlers. */
  elementProps?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
  };
  /** Content to render inside the card. */
  children?: ReactNode;
  /** Visual style: 'default' (elevated with shadow) or 'outlined' (bordered, flat). */
  variant?: CardVariants;
}

const defaultProps: CardProps = {
  variant: 'default',
  elementProps: {
    rootDiv: {},
  },
};

const CardDiv = applyCustomStyles(
  styled.div<StyledComponentsPrefix<Required<CardProps>>>(({ theme, $variant }) => {
    const isLight = theme.mode === 'light';

    return {
      display: 'block',
      width: 'fit-content',
      backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[200],
      borderRadius: theme.borderRadius(3),
      boxShadow: theme.boxShadow[1],
      border:
        $variant === 'outlined'
          ? `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[400]}`
          : 'none',
    };
  }),
);

/** A container that visually groups content with either a subtle elevation or a border. */
export const Card = forwardRef<HTMLDivElement, CardProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      variant,
      className,
      elementProps: { rootDiv: rootDivHTMLAttributes } = {},
      children,
    } = getDefaultProps<CardProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.card?.defaultProps,
      defaultProps,
    });

    return (
      <CardDiv
        {...rootDivHTMLAttributes}
        $variant={variant}
        $customizations={customizations.components?.card}
        className={joinClasses(className, rootDivHTMLAttributes?.className)}
        ref={forwardedRef}
      >
        {children}
      </CardDiv>
    );
  },
);

Card.displayName = 'Card';
