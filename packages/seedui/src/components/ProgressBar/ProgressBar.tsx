import { ForwardedRef, forwardRef, HTMLAttributes, useContext } from 'react';
import styled from 'styled-components';

import { SeedContextType, SemanticColors } from '../../types';
import { InternalProps, StyledComponentsPrefix } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContext } from '../ThemeProvider/context';

export type ProgressBarColor = keyof Pick<
  SemanticColors,
  'primary' | 'neutral' | 'success' | 'info' | 'warning' | 'error'
>;

export interface ProgressBarProps {
  value?: number;
  height?: string | number;
  color?: ProgressBarColor;
  disableAnimation?: boolean;
  elementProps?: {
    root?: HTMLAttributes<HTMLDivElement>;
    fill?: HTMLAttributes<HTMLDivElement>;
  };
}

const defaultProps: ProgressBarProps = {
  value: 0,
  height: 8,
  color: 'primary',
  disableAnimation: false,
  elementProps: {
    root: {},
    fill: {},
  },
};

const clampValue = (value: number): number => Math.min(100, Math.max(0, value));

const ProgressBarRoot = applyCustomStyles(
  styled.div<StyledComponentsPrefix<Required<Pick<ProgressBarProps, 'height'>>>>(({ theme, $height }) => {
    const isLight = theme.mode === 'light';
    const resolvedHeight = typeof $height === 'number' ? `${$height}px` : $height;
    return {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: resolvedHeight,
      borderRadius: theme.borderRadius('full'),
      backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[300],
      overflow: 'hidden',
      boxSizing: 'border-box',
    };
  }),
);

const ProgressBarFill = styled.div<
  StyledComponentsPrefix<Required<Pick<ProgressBarProps, 'value' | 'color' | 'disableAnimation'>>>
>(({ theme, $value, $color, $disableAnimation }) => {
  const fillColor = theme.colors[$color].default;

  return {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    height: '100%',
    width: `${clampValue($value)}%`,
    borderRadius: 'inherit',
    backgroundColor: fillColor,
    transition: 'width 0.3s ease',
    ...(!$disableAnimation && {
      background: `linear-gradient(100deg, rgba(220,220,220,0) 40%, rgba(220,220,220,0.5) 50%, rgba(220,220,220,0) 60%) ${fillColor}`,
      backgroundSize: '200% 100%',
      backgroundPositionX: '180%',
      animation: '2s progressbar-shimmer ease-in-out infinite',
      '@keyframes progressbar-shimmer': {
        to: { backgroundPositionX: '-20%' },
      },
    }),
  };
});

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      value,
      height,
      color,
      disableAnimation,
      className,
      elementProps: {
        root: rootHTMLAttributes,
        fill: fillHTMLAttributes,
      } = {},
    } = getDefaultProps<ProgressBarProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.progressBar?.defaultProps,
      defaultProps,
    });

    const clampedValue = clampValue(value);

    return (
      <ProgressBarRoot
        {...rootHTMLAttributes}
        $height={height}
        $customizations={customizations.components?.progressBar}
        className={joinClasses('progress-bar-track', className, rootHTMLAttributes?.className)}
        ref={forwardedRef}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <ProgressBarFill
          $value={clampedValue}
          $color={color}
          $disableAnimation={disableAnimation}
          className={joinClasses('progress-bar-fill', fillHTMLAttributes?.className)}
          {...fillHTMLAttributes}
        />
      </ProgressBarRoot>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';
