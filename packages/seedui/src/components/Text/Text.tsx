import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, RefAttributes } from 'react';
import styled from 'styled-components';
import { mobileBreakpoint, tabletBreakpoint } from '../../tokens/breakpoints';
import { StyledComponentsPrefix } from '../../types';

export type TextVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'caption' | 'small';
export interface TextProps {
  variant?: TextVariants;
  bottomSpacing?: boolean;
}
export type TextPropsAndAttributes = PropsWithChildren<
  TextProps & HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>
>;

const TextFactory = (variant: TextVariants) => {
  const isHeading =
    variant === 'h1' ||
    variant === 'h2' ||
    variant === 'h3' ||
    variant === 'h4' ||
    variant === 'h5' ||
    variant === 'h6';

  const tag = isHeading ? variant : 'p';

  return styled[tag]<StyledComponentsPrefix<Required<TextProps & { $bottomSpacing: number }>>>(
    ({ theme, $variant, $bottomSpacing }) => ({
      fontFamily: theme.typography[$variant].fontFamily,
      fontWeight: theme.typography[$variant].fontWeight,
      color:
        tag === 'p' && theme.mode === 'dark'
          ? theme.colors.neutral[100]
          : theme.mode === 'light'
          ? theme.colors.neutral.black
          : theme.colors.neutral.white,

      margin: 0,
      fontSize: theme.typography[$variant].responsive.desktop.fontSize,
      lineHeight: `${theme.typography[$variant].responsive.desktop.lineHeight}px`,
      marginBottom: $bottomSpacing ? '0.4em' : 0,

      [`@media only screen and (max-width: ${theme.breakpoints[tabletBreakpoint]}px)`]: {
        fontSize: theme.typography[$variant].responsive.tablet.fontSize,
        lineHeight: `${theme.typography[$variant].responsive.tablet.lineHeight}px`,
      },
      [`@media only screen and (max-width: ${theme.breakpoints[mobileBreakpoint]}px)`]: {
        fontSize: theme.typography[$variant].responsive.mobile.fontSize,
        lineHeight: `${theme.typography[$variant].responsive.mobile.lineHeight}px`,
      },
    }),
  );
};

const mapVariantToElement: Record<TextVariants, ReturnType<typeof TextFactory>> = {
  h1: TextFactory('h1'),
  h2: TextFactory('h2'),
  h3: TextFactory('h3'),
  h4: TextFactory('h4'),
  h5: TextFactory('h5'),
  h6: TextFactory('h6'),
  p: TextFactory('p'),
  caption: TextFactory('caption'),
  small: TextFactory('small'),
};

export const Text = forwardRef<
  HTMLParagraphElement,
  PropsWithChildren<TextProps & HTMLAttributes<HTMLParagraphElement>>
>(
  (
    { children, variant = 'p', bottomSpacing = false, ...allHTMLAttributes },
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const TextElement = mapVariantToElement[variant];

    return (
      <TextElement ref={forwardedRef} $bottomSpacing={bottomSpacing} $variant={variant} {...allHTMLAttributes}>
        {children}
      </TextElement>
    );
  },
);

Text.displayName = 'Text';
