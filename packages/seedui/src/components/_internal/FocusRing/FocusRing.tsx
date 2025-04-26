import { ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';

import { Colors } from '../../../types';
import { StyledComponentsPrefix } from '../../../types/internal';

interface FocusRingProps {
  show: boolean;
  pressed?: boolean;
  radius?: number | 'inherit';
  color: Colors;
}

const FocusRingDiv = styled.div<StyledComponentsPrefix<Required<FocusRingProps>>>(
  ({ theme, $color, $radius, $pressed, $show }) => {
    const isLight = theme.mode === 'light';
    const borderWidth = 4;
    const offset = 1;

    const borderColor = isLight
      ? $color === 'neutral'
        ? theme.colors.neutral[200]
        : theme.colors[$color][300]
      : $color === 'neutral'
      ? theme.colors.neutral[600]
      : theme.colors[$color][800];

    return {
      position: 'absolute',
      top: -(borderWidth + offset),
      right: -(borderWidth + offset),
      width: `calc(100% + ${offset * 2}px)`,
      height: `calc(100% + ${offset * 2}px)`,
      border: `${borderWidth}px solid ${borderColor}`,
      borderRadius: $radius,
      opacity: $show && !$pressed ? 1 : 0,
      transition: 'opacity .1s, transform .2s',
      transform: `scale(${$show && !$pressed ? 1 : 0.8})`,
    };
  },
);

export const FocusRing = forwardRef<HTMLButtonElement, FocusRingProps>(
  (
    { show, pressed = false, radius = 'inherit', color }: FocusRingProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>,
  ) => {
    return <FocusRingDiv $color={color} $radius={radius} $show={show} $pressed={pressed} ref={forwardedRef} />;
  },
);

FocusRing.displayName = 'FocusRing';
