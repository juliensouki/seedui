import { ForwardedRef, forwardRef, HTMLAttributes, useContext } from 'react';
import styled from 'styled-components';

import { InternalProps, StyledComponentsPrefix } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContextType } from '../../types';
import { SeedContext } from '../ThemeProvider/context';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps {
  htmlAttributes?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
  };
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const defaultProps: SkeletonProps = {
  variant: 'text',
  animation: 'pulse',
  htmlAttributes: {
    rootDiv: {},
  },
};

const SkeletonDiv = applyCustomStyles(
  styled.div<StyledComponentsPrefix<Required<SkeletonProps>>>(
    ({ theme, $variant, $width, $height, $animation }) => {
      const isLight = theme.mode === 'light';
      const bgColor = isLight ? theme.colors.neutral[200] : theme.colors.neutral[700];
      const shimmerColor = isLight ? theme.colors.neutral[300] : theme.colors.neutral[600];

      const borderRadius = (() => {
        switch ($variant) {
          case 'circular':
            return '50%';
          case 'rectangular':
            return 0;
          case 'rounded':
            return theme.borderRadius(2);
          case 'text':
          default:
            return theme.borderRadius(1);
        }
      })();

      const resolvedWidth = $width != null ? (typeof $width === 'number' ? `${$width}px` : $width) : '100%';
      const resolvedHeight = (() => {
        if ($height != null) return typeof $height === 'number' ? `${$height}px` : $height;
        if ($variant === 'circular') return resolvedWidth;
        if ($variant === 'text') return '1em';
        return '100px';
      })();

      return {
        display: 'block',
        backgroundColor: bgColor,
        borderRadius,
        width: resolvedWidth,
        height: resolvedHeight,
        overflow: 'hidden',
        position: 'relative' as const,
        animation: $animation === 'pulse' ? 'skeleton-pulse 1.5s ease-in-out infinite' : undefined,

        '@keyframes skeleton-pulse': {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.4 },
          '100%': { opacity: 1 },
        },

        ...($animation === 'wave' && {
          '&::after': {
            content: '""',
            position: 'absolute' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
            animation: 'skeleton-wave 1.6s linear infinite',
          },
          '@keyframes skeleton-wave': {
            '0%': { transform: 'translateX(-100%)' },
            '60%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(100%)' },
          },
        }),

        ...($variant === 'text' && {
          marginTop: 0,
          marginBottom: 0,
          transformOrigin: '0 55%',
          transform: 'scale(1, 0.6)',
        }),
      };
    },
  ),
);

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      variant,
      width,
      height,
      animation,
      className,
      htmlAttributes: { rootDiv: rootDivHTMLAttributes } = {},
    } = getDefaultProps<SkeletonProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.skeleton?.defaultProps,
      defaultProps,
    });

    return (
      <SkeletonDiv
        {...rootDivHTMLAttributes}
        $variant={variant}
        $width={width}
        $height={height}
        $animation={animation}
        $customizations={customizations.components?.skeleton}
        className={joinClasses(className, rootDivHTMLAttributes?.className)}
        ref={forwardedRef}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';
