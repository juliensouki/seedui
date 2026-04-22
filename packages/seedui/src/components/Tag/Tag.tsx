import { ForwardedRef, forwardRef, HTMLAttributes, useContext } from 'react';
import styled from 'styled-components';
import { XIcon } from 'lucide-react';

import { SeedContextType, SemanticColors, Sizes } from '../../types';
import { Text, TextPropsAndAttributes } from '../Text';
import { InternalProps } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContext } from '../ThemeProvider/context';
import { IconButton } from '../Button';

export type TagColor = keyof Pick<
  SemanticColors,
  'primary' | 'neutral' | 'success' | 'info' | 'warning' | 'error'
>;
export type TagSize = Extract<Sizes, 'sm' | 'md'>;

/** A small colored label for categories, statuses, or metadata. */
export interface TagProps {
  /** Tag color from the theme's semantic palette. */
  color?: TagColor;
  /** Tag size: 'sm' or 'md'. */
  size?: TagSize;
  /** Shows an X button to allow removal. */
  removable?: boolean;
  /** Called when the remove button is clicked. */
  onRemove?: () => void;
  /** Access underlying DOM elements (root, removeButton). */
  elementProps?: {
    root?: HTMLAttributes<HTMLDivElement>;
    removeButton?: HTMLAttributes<HTMLButtonElement>;
  };
  /** Pass props to the internal Text component. */
  forwardProps?: {
    text?: TextPropsAndAttributes;
  };
  /** Tag label text. */
  children: string;
}

const defaultProps: TagProps = {
  color: 'neutral',
  size: 'md',
  removable: false,
  onRemove: undefined,
  children: '',
  elementProps: {
    root: {},
    removeButton: {},
  },
  forwardProps: {
    text: {},
  },
};

const TagDiv = applyCustomStyles(
  styled.div<{ color: TagColor; size: TagSize; $removable: boolean }>((props) => {
    const theme = props.theme;
    const color = props.color;

    const darkNeutralColors = {
      backgroundColor: theme.colors.neutral[400],
      color: theme.colors.neutral[800],
    };
    const commonColors = {
      color: color === 'neutral' ? theme.colors.neutral[600] : theme.colors[color][600],
      backgroundColor: theme.colors[color][200],
    };

    return {
      display: 'flex',
      gap: theme.spacing(1),
      alignItems: 'center',
      height: '100%',
      width: 'max-content',
      boxSizing: 'border-box',
      ...(theme.mode === 'dark' && color === 'neutral' ? darkNeutralColors : commonColors),
      padding: `${theme.spacing(0.75)}px ${theme.spacing(1)}px`,
      minHeight: 24 + theme.spacing(0.75) * 2,
      borderRadius: 9999,
      flexShrink: 0,
    };
  }),
);

const TagText = styled(Text)(() => ({
  lineHeight: 1,
  margin: '0 !important',

  '&&&': {
    color: 'inherit ',
  },
}));

const RemoveButton = styled(IconButton)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
}));

/** A small colored label used for categories, statuses, or metadata badges. */
export const Tag = forwardRef<HTMLDivElement, TagProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      color,
      size,
      removable,
      onRemove,
      elementProps: { root: rootHTMLAttributes, removeButton: removeButtonHTMLAttributes } = {},
      forwardProps: { text: textProps } = {},
      className,
      children,
    } = getDefaultProps<TagProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.tag?.defaultProps,
      defaultProps,
    });

    return (
      <TagDiv
        color={color}
        size={size}
        $removable={removable}
        ref={forwardedRef}
        className={joinClasses('tag-root', className, rootHTMLAttributes?.className)}
        $customizations={customizations.components?.tag}
        {...rootHTMLAttributes}
      >
        <TagText variant={size === 'sm' ? 'caption' : 'p'} size={size} {...textProps}>
          {children}
        </TagText>
        {removable && onRemove && (
          <RemoveButton size="sm" color="neutral" onClick={onRemove} type="button" className={joinClasses('tag-remove-button', removeButtonHTMLAttributes?.className)} {...removeButtonHTMLAttributes}>
            <XIcon size={14} />
          </RemoveButton>
        )}
      </TagDiv>
    );
  },
);

Tag.displayName = 'Tag';
