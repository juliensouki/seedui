import { HTMLAttributes, MouseEventHandler } from 'react';
import styled from 'styled-components';

import { Colors, Sizes } from '../../../types';

export type ButtonColors = Exclude<Colors, 'success' | 'warning' | 'error' | 'info'>;
export type ButtonVariants = 'filled' | 'transparent';
export type ButtonSizes = Exclude<Sizes, 'xs' | 'xl'>;

export interface ButtonBaseProps {
  htmlAttributes?: {
    rootButton?: Exclude<HTMLAttributes<HTMLButtonElement>, 'disabled' | 'onClick'>;
  };
  disabled?: boolean;
  size?: Exclude<Sizes, 'xs' | 'xl'>;
  color?: ButtonColors;
  variant?: ButtonVariants;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const ButtonCommon = styled.button((props) => {
  const theme = props.theme;

  return {
    position: 'relative',
    display: 'inline-flex',
    border: 'none',

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
      color: theme.colors.neutral[300],

      '& svg': {
        color: theme.colors.neutral[300],
      },
    },
  };
});
