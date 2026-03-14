import { ForwardedRef, forwardRef, HTMLAttributes, ImgHTMLAttributes, useContext } from 'react';
import styled from 'styled-components';

import { SeedContextType, SemanticColors, Sizes } from '../../types';
import { InternalProps } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContext } from '../ThemeProvider/context';
import { Text } from '../Text';

export type AvatarSize = Extract<Sizes, 'sm' | 'md' | 'lg'>;
export type AvatarColor = keyof Pick<
  SemanticColors,
  'primary' | 'neutral' | 'success' | 'info' | 'warning' | 'error'
>;

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  color?: AvatarColor;
  elementProps?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
    img?: ImgHTMLAttributes<HTMLImageElement>;
  };
}

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

const fontSizeMap: Record<AvatarSize, number> = {
  sm: 12,
  md: 14,
  lg: 18,
};

const defaultProps: AvatarProps = {
  size: 'md',
  color: 'primary',
  elementProps: {
    rootDiv: {},
    img: {},
  },
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const AvatarRoot = applyCustomStyles(
  styled.div<Required<Pick<AvatarProps, 'size' | 'color'>>>((props) => {
    const theme = props.theme;
    const color = props.color;
    const size = sizeMap[props.size];

    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: theme.borderRadius('full'),
      backgroundColor: theme.colors[color][300],
      color: theme.colors[color][800],
      overflow: 'hidden',
      flexShrink: 0,
      userSelect: 'none',
      boxSizing: 'border-box',
    };
  }),
);

const AvatarImage = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const AvatarInitials = styled(Text)({
  lineHeight: 1,
  margin: '0 !important',
  fontWeight: 600,

  '&&&': {
    color: 'inherit',
  },
});

export const Avatar = forwardRef<HTMLDivElement, AvatarProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      src,
      alt,
      name,
      size,
      color,
      elementProps: { rootDiv: rootDivHTMLAttributes, img: imgHTMLAttributes } = {},
      className,
    } = getDefaultProps<AvatarProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.avatar?.defaultProps,
      defaultProps,
    });

    return (
      <AvatarRoot
        size={size}
        color={color}
        ref={forwardedRef}
        className={joinClasses(className, rootDivHTMLAttributes?.className)}
        $customizations={customizations.components?.avatar}
        {...rootDivHTMLAttributes}
      >
        {src ? (
          <AvatarImage src={src} alt={alt ?? name ?? 'avatar'} {...imgHTMLAttributes} />
        ) : name ? (
          <AvatarInitials style={{ fontSize: fontSizeMap[size] }}>{getInitials(name)}</AvatarInitials>
        ) : (
          <svg
            width={fontSizeMap[size] + 4}
            height={fontSizeMap[size] + 4}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        )}
      </AvatarRoot>
    );
  },
);

Avatar.displayName = 'Avatar';
