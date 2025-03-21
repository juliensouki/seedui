import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import styled from 'styled-components';

import { SemanticColors, Sizes } from '../../types';
import { Text, TextPropsAndAttributes } from '../Text';

export type TagColor = keyof Pick<
  SemanticColors,
  'primary' | 'secondary' | 'neutral' | 'success' | 'info' | 'warning' | 'error'
>;
export type TagSize = Extract<Sizes, 'sm' | 'md'>;

export interface TagProps {
  color?: TagColor;
  size?: TagSize;
  htmlAttributes?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
  };
  forwardProps?: {
    text?: TextPropsAndAttributes;
  };
  children: string;
}

const TagDiv = styled.div<Required<TagProps>>((props) => {
  const theme = props.theme;
  const color = props.color;
  const size = props.size;

  return {
    display: 'block',
    height: '100%',
    width: 'max-content',
    border: `1px solid ${color === 'neutral' ? theme.colors.neutral[400] : theme.colors[color][600]}`,
    color: color === 'neutral' ? theme.colors.neutral[400] : theme.colors[color][600],
    backgroundColor: theme.colors[color][100],
    padding:
      size === 'sm'
        ? `${theme.spacing['100']}px ${theme.spacing['100']}px`
        : `${theme.spacing['100']}px ${theme.spacing['150']}px`,
    borderRadius: 100,
    flexShrink: 0,
  };
});

const TagText = styled(Text)(() => ({
  lineHeight: 1,
  margin: '0 !important',

  '&&&': {
    color: 'inherit ',
  },
}));

export const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      color = 'neutral',
      size = 'md',
      htmlAttributes: { rootDiv: rootDivHTMLAttributes } = {},
      forwardProps: { text: textProps } = {},
      children,
    }: TagProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <TagDiv color={color} size={size} ref={forwardedRef} {...rootDivHTMLAttributes}>
        <TagText variant={size === 'sm' ? 'caption' : 'p'} size={size} {...textProps}>
          {children}
        </TagText>
      </TagDiv>
    );
  },
);

Tag.displayName = 'Tag';
