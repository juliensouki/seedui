import { HTMLAttributes, MouseEventHandler } from 'react';

import { Colors, Sizes } from '../../../types';

export type ButtonPresetColors = Exclude<Colors, 'success' | 'warning' | 'info'>;
export type ButtonColors = ButtonPresetColors | (string & {});
export type ButtonVariants = 'filled' | 'transparent';
export type ButtonSizes = Exclude<Sizes, 'xs' | 'xl'>;
export type ButtonType = 'button' | 'reset' | 'submit';

/** Shared props for both Button and IconButton. */
export interface ButtonBaseProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'color'> {
  /** Shows a spinner and disables interaction while an async action completes. */
  isLoading?: boolean;
  /** Visually mutes the button and prevents all interaction. */
  disabled?: boolean;
  /** Button size: 'sm', 'md', or 'lg'. */
  size?: Exclude<Sizes, 'xs' | 'xl'>;
  /** Color scheme: 'primary' for main actions, 'neutral' for secondary, 'error' for destructive. */
  color?: ButtonColors;
  /** Visual style: 'filled' for emphasis, 'transparent' for low-prominence actions. */
  variant?: ButtonVariants;
  /** Click handler. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** HTML button type — 'button', 'submit', or 'reset'. */
  type?: ButtonType;
}
