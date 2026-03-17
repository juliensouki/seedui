import { ElementType, ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, RefAttributes, useContext } from 'react';
import styled from 'styled-components';

import { StyledComponentsPrefix } from '../../types/internal';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContextType } from '../../types';
import { SeedContext } from '../ThemeProvider/context';

export type TextVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'caption' | 'small';
export interface TextProps {
  variant?: TextVariants;
  as?: ElementType;
  bottomSpacing?: boolean;
}
export type TextPropsAndAttributes = PropsWithChildren<
  TextProps & HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>
>;

const defaultProps: TextProps = {
  variant: 'p',
  bottomSpacing: false,
};

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
      letterSpacing: theme.typography[$variant].letterSpacing,
      color:
        tag === 'p' && theme.mode === 'dark'
          ? theme.colors.neutral[900]
          : theme.mode === 'light'
          ? theme.colors.neutral.black
          : theme.colors.neutral.white,

      margin: 0,
      fontSize: theme.typography[$variant].fontSize,
      lineHeight: theme.typography[$variant].lineHeight,
      marginBottom: $bottomSpacing ? '0.4em' : 0,

      ...(theme.typography[$variant].responsive?.tablet && {
        [`@media only screen and (max-width: ${theme.breakpoints[theme.breakpoints.tablet]}px)`]: {
          ...theme.typography[$variant].responsive.tablet,
        },
      }),
      ...(theme.typography[$variant].responsive?.mobile && {
        [`@media only screen and (max-width: ${theme.breakpoints[theme.breakpoints.mobile]}px)`]: {
          ...theme.typography[$variant].responsive.mobile,
        },
      }),
    }),
  );
};

const mapVariantToElement: Record<TextVariants, ReturnType<typeof TextFactory>> = {
  h1: applyCustomStyles(TextFactory('h1')),
  h2: applyCustomStyles(TextFactory('h2')),
  h3: applyCustomStyles(TextFactory('h3')),
  h4: applyCustomStyles(TextFactory('h4')),
  h5: applyCustomStyles(TextFactory('h5')),
  h6: applyCustomStyles(TextFactory('h6')),
  p: applyCustomStyles(TextFactory('p')),
  caption: applyCustomStyles(TextFactory('caption')),
  small: applyCustomStyles(TextFactory('small')),
};

export const Text = forwardRef<
  HTMLParagraphElement,
  PropsWithChildren<TextProps & HTMLAttributes<HTMLParagraphElement> & { as?: ElementType }>
>((props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
  const { customizations } = useContext<SeedContextType>(SeedContext);
  const { variant, as: asProp, children, bottomSpacing, ...allHTMLAttributes } = getDefaultProps<PropsWithChildren<TextProps>>({
    providedProps: props,
    globalDefaultProps: customizations?.components?.text?.defaultProps,
    defaultProps,
  });

  const TextElement = mapVariantToElement[variant];

  return (
    <TextElement
      ref={forwardedRef}
      as={asProp}
      $bottomSpacing={bottomSpacing}
      $variant={variant}
      $customizations={customizations.components?.text}
      {...allHTMLAttributes}
    >
      {children}
    </TextElement>
  );
});

Text.displayName = 'Text';
