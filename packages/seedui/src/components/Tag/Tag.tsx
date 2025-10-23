import { ForwardedRef, forwardRef, HTMLAttributes, useContext } from 'react';
import styled from 'styled-components';

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
  'primary' | 'secondary' | 'neutral' | 'success' | 'info' | 'warning' | 'error'
>;
export type TagSize = Extract<Sizes, 'sm' | 'md'>;

export interface TagProps {
  color?: TagColor;
  size?: TagSize;
  removable?: boolean;
  onRemove?: () => void;
  htmlAttributes?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
  };
  forwardProps?: {
    text?: TextPropsAndAttributes;
  };
  children: string;
}

const defaultProps: TagProps = {
  color: 'neutral',
  size: 'md',
  removable: false,
  onRemove: undefined,
  children: '',
  htmlAttributes: {
    rootDiv: {},
  },
  forwardProps: {
    text: {},
  },
};

const TagDiv = applyCustomStyles(
  styled.div<Required<TagProps>>((props) => {
    const theme = props.theme;
    const color = props.color;
    const removable = props.removable;

    const darkNeutralColors = {
      backgroundColor: theme.colors.neutral[600],
      color: theme.colors.neutral[200],
      borderColor: theme.colors.neutral[500],
    };
    const commonColors = {
      borderColor: color === 'neutral' ? theme.colors.neutral[200] : theme.colors[color][600],
      color: color === 'neutral' ? theme.colors.neutral[600] : theme.colors[color][600],
      backgroundColor: theme.colors[color][200],
    };

    return {
      display: 'flex',
      gap: theme.spacing['100'],
      alignItems: 'center',
      height: '100%',
      width: 'max-content',
      boxSizing: 'border-box',
      border: `1px solid`,
      ...(theme.mode === 'dark' && color === 'neutral' ? darkNeutralColors : commonColors),
      padding: removable ? theme.spacing['050'] : `${theme.spacing['100']}px ${theme.spacing['150']}px`,
      paddingLeft: theme.spacing['100'],
      borderRadius: 100,
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

export const Tag = forwardRef<HTMLDivElement, TagProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      color,
      size,
      removable,
      onRemove,
      htmlAttributes: { rootDiv: rootDivHTMLAttributes } = {},
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
        removable={removable}
        ref={forwardedRef}
        className={joinClasses(className, className, rootDivHTMLAttributes?.className)}
        $customizations={customizations.components?.tag}
        {...rootDivHTMLAttributes}
      >
        <TagText variant={size === 'sm' ? 'caption' : 'p'} size={size} {...textProps}>
          {children}
        </TagText>
        {removable && onRemove && (
          <RemoveButton size="sm" color="neutral" onClick={onRemove} type="button">
            <Text style={{ padding: 0, fontSize: 18 }}>×</Text>
          </RemoveButton>
        )}
      </TagDiv>
    );
  },
);

Tag.displayName = 'Tag';
