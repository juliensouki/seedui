import { ButtonProps } from '../Button';
import { IconButtonProps } from '../IconButton';

export const defaultProps: ButtonProps | IconButtonProps = {
  variant: 'filled',
  color: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  onClick: undefined,
};
