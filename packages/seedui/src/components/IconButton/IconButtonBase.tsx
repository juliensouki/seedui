import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

import { Colors, Sizes } from '../../types';

export type IconButtonColors = Exclude<Colors, 'success' | 'warning' | 'error' | 'info'>;
export type IconButtonVariants = 'filled' | 'transparent';

export interface IconButtonProps {
  htmlAttributes?: {
    rootButton?: Exclude<HTMLAttributes<HTMLButtonElement>, 'disabled'>;
  };
  disabled?: boolean;
  size?: Exclude<Sizes, 'xs' | 'xl'>;
  color?: IconButtonColors;
  variant?: IconButtonVariants;
  children?: ReactNode;
}

const mapSizeToAttributes: Record<Exclude<Sizes, 'xs' | 'xl'>, { iconSize: number }> = {
  sm: { iconSize: 17 },
  md: { iconSize: 22 },
  lg: { iconSize: 30 },
};

export const IconButtonBase = styled.button<Required<IconButtonProps>>((props) => {
  const theme = props.theme;
  const size = props.size;
  const isLight = theme.mode === 'light';

  return {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    padding: size === 'sm' ? theme.spacing[100] : theme.spacing[150],
    border: 'none',

    '& svg': {
      color: isLight ? theme.colors.neutral.white : theme.colors.neutral[900],
      width: mapSizeToAttributes[size].iconSize,
      height: mapSizeToAttributes[size].iconSize,
    },

    '&:hover': {
      cursor: 'pointer',
    },

    '&:focus': {
      outline: 'none',
    },

    '&:active': {
      transform: 'scale(0.95)',
    },

    '&:disabled': {
      backgroundColor: theme.colors.neutral[200],
      '& svg': {
        color: theme.colors.neutral[300],
      },
    },
  };
});
