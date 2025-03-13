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
  divProps?: HTMLAttributes<HTMLDivElement>;
  textProps?: TextPropsAndAttributes;
  children: string;
}

const TagDiv = styled.div<Required<TagProps>>((props) => {
  const theme = props.theme;
  const color = props.color;
  const size = props.size;

  return {
    display: 'block',
    height: '100%',
    border: `1px solid ${color === 'neutral' ? theme.colors.neutral[400] : theme.colors[color][600]}`,
    color: color === 'neutral' ? theme.colors.neutral[400] : theme.colors[color][600],
    backgroundColor: theme.colors[color][100],
    padding:
      size === 'sm'
        ? `${theme.spacing['050']}px ${theme.spacing['100']}px`
        : `${theme.spacing['050']}px ${theme.spacing['150']}px`,
    borderRadius: 100,
    flexShrink: 0,
  };
});

const TagText = styled(Text)(() => ({
  color: 'inherit',
  lineHeight: 1,
  margin: '0 !important',
}));

export const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    { color = 'neutral', size = 'md', divProps, textProps, children }: TagProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <TagDiv {...divProps} color={color} size={size} ref={forwardedRef}>
        <TagText variant={size === 'sm' ? 'small' : 'p'} size={size} {...textProps}>
          {children}
        </TagText>
      </TagDiv>
    );
  },
);

Tag.displayName = 'Tag';
