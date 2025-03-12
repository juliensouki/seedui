import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, RefAttributes } from 'react';
import styled from 'styled-components';
import { mobileBreakpoint, tabletBreakpoint } from '../../tokens/breakpoints';

export type TextVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'caption' | 'small';
export interface TextProps {
  variant?: TextVariants;
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

  return styled[tag]<Required<TextProps>>((props) => ({
    fontFamily: props.theme.typography[props.variant].fontFamily,
    fontWeight: props.theme.typography[props.variant].fontWeight,

    fontSize: props.theme.typography[props.variant].responsive.desktop.fontSize,
    lineHeight: `${props.theme.typography[props.variant].responsive.desktop.lineHeight}px`,
    margin: `${props.theme.typography[props.variant].responsive.desktop.paragraphSpacing}px 0`,

    [`@media only screen and (max-width: ${props.theme.breakpoints[tabletBreakpoint]}px)`]: {
      fontSize: props.theme.typography[props.variant].responsive.tablet.fontSize,
      lineHeight: `${props.theme.typography[props.variant].responsive.tablet.lineHeight}px`,
      margin: `${props.theme.typography[props.variant].responsive.tablet.paragraphSpacing}px 0`,
    },
    [`@media only screen and (max-width: ${props.theme.breakpoints[mobileBreakpoint]}px)`]: {
      fontSize: props.theme.typography[props.variant].responsive.mobile.fontSize,
      lineHeight: `${props.theme.typography[props.variant].responsive.mobile.lineHeight}px`,
      margin: `${props.theme.typography[props.variant].responsive.mobile.paragraphSpacing}px 0`,
    },
  }));
};

export const Text = forwardRef<
  HTMLParagraphElement,
  PropsWithChildren<TextProps & HTMLAttributes<HTMLParagraphElement>>
>(({ children, variant = 'p', ...allProps }, forwardedRef: ForwardedRef<HTMLDivElement>) => {
  const TextElement = TextFactory(variant);

  return (
    <TextElement ref={forwardedRef} variant={variant} {...allProps}>
      {children}
    </TextElement>
  );
});
