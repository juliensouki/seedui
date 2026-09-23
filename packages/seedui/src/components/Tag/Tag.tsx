import { ForwardedRef, forwardRef, HTMLAttributes, useContext } from 'react';
import styled, { useTheme } from 'styled-components';
import { XIcon } from 'lucide-react';

import { SeedContextType, SemanticColors, Sizes, Theme } from '../../types';
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

const mapSizeToAttributes: Record<
  TagSize,
  { paddingY: number; paddingX: number; removableHeight: number; removablePaddingRight: number; removeIconSize: number }
> = {
  sm: { paddingY: 0.875, paddingX: 1, removableHeight: 28, removablePaddingRight: 3, removeIconSize: 10 },
  md: { paddingY: 1, paddingX: 1.5, removableHeight: 34, removablePaddingRight: 5, removeIconSize: 12 },
};

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

const getTagColors = (theme: Theme, color: TagColor) => {
  if (theme.mode === 'dark' && color === 'neutral') {
    return { backgroundColor: theme.colors.neutral[400], color: theme.colors.neutral[800] };
  }

  return {
    color: theme.colors[color][600],
    backgroundColor: theme.colors[color][200],
  };
};

const getRemoveButtonColor = (theme: Theme, color: TagColor) =>
  theme.mode === 'dark' && color === 'neutral' ? theme.colors.neutral[500] : theme.colors[color][300];

const TagDiv = applyCustomStyles(
  styled.div<{ color: TagColor; size: TagSize; $removable: boolean }>((props) => {
    const theme = props.theme;
    const { paddingY, paddingX, removableHeight, removablePaddingRight } = mapSizeToAttributes[props.size];

    return {
      display: 'flex',
      gap: theme.spacing(0.75),
      alignItems: 'center',
      height: '100%',
      width: 'max-content',
      boxSizing: 'border-box',
      ...getTagColors(theme, props.color),
      padding: `${theme.spacing(paddingY)}px ${theme.spacing(paddingX)}px`,
      // Removable tags get a fixed height, to fit the remove button; otherwise the text sets it.
      ...(props.$removable && {
        minHeight: removableHeight,
        padding: `0 ${removablePaddingRight}px 0 ${theme.spacing(paddingX)}px`,
      }),
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

/** A small colored label used for categories, statuses, or metadata badges. */
export const Tag = forwardRef<HTMLDivElement, TagProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const theme = useTheme();
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
        $removable={removable && !!onRemove}
        ref={forwardedRef}
        className={joinClasses('tag-root', className, rootHTMLAttributes?.className)}
        $customizations={customizations.components?.tag}
        {...rootHTMLAttributes}
      >
        <TagText variant={size === 'sm' ? 'caption' : 'p'} size={size} {...textProps}>
          {children}
        </TagText>
        {removable && onRemove && (
          <IconButton size="sm" iconSize={mapSizeToAttributes[size].removeIconSize} color={getRemoveButtonColor(theme, color)} onClick={onRemove} type="button" className={joinClasses('tag-remove-button', removeButtonHTMLAttributes?.className)} {...removeButtonHTMLAttributes}>
            <XIcon color={getTagColors(theme, color).color} />
          </IconButton>
        )}
      </TagDiv>
    );
  },
);

Tag.displayName = 'Tag';
