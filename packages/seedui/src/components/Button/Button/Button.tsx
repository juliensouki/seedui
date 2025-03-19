import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { FocusRing } from '../../_internal/FocusRing';
import { Sizes, StyledProps } from '../../../types';
import { getPrimaryFilledButtonStyles } from '../_common/styles/get-primary-filled-styles';
import { getPrimaryTransparentButtonStyles } from '../_common/styles/get-primary-transparent-styles';
import { getSecondaryFilledButtonStyles } from '../_common/styles/get-secondary-filled-styles';
import { getNeutralFilledButtonStyles } from '../_common/styles/get-neutral-filled-styles';
import { getSecondaryTransparentButtonStyles } from '../_common/styles/get-secondary-transparent-styles';
import { getNeutralTransparentButtonStyles } from '../_common/styles/get-neutral-transparent-styles';
import { ButtonBaseProps, ButtonColors, ButtonCommon, ButtonVariants } from '../_common/ButtonCommon';

export interface ButtonProps extends ButtonBaseProps {
  children?: ReactNode;
}

const mapSizeToAttributes: Record<Exclude<Sizes, 'xs' | 'xl'>, { fontSize: number }> = {
  sm: { fontSize: 12 },
  md: { fontSize: 14 },
  lg: { fontSize: 16 },
};

export const ButtonBase = styled(ButtonCommon)((props: StyledProps<Required<ButtonProps>>) => {
  const theme = props.theme;
  const size = props.size;

  return {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius[100],
    padding: size === 'sm' ? theme.spacing[100] : theme.spacing[150],

    fontFamily: props.theme.typography.p.fontFamily,
    fontSize: mapSizeToAttributes[size].fontSize,
  };
});

const componentsMap: Record<ButtonVariants, Record<ButtonColors, typeof ButtonBase>> = {
  filled: {
    primary: styled(ButtonBase)((props: StyledProps<ButtonProps>) => getPrimaryFilledButtonStyles(props.theme)),
    secondary: styled(ButtonBase)((props: StyledProps<ButtonProps>) => getSecondaryFilledButtonStyles(props.theme)),
    neutral: styled(ButtonBase)((props: StyledProps<ButtonProps>) => getNeutralFilledButtonStyles(props.theme)),
  },
  transparent: {
    primary: styled(ButtonBase)((props: StyledProps<ButtonProps>) => getPrimaryTransparentButtonStyles(props.theme)),
    secondary: styled(ButtonBase)((props: StyledProps<ButtonProps>) =>
      getSecondaryTransparentButtonStyles(props.theme),
    ),
    neutral: styled(ButtonBase)((props: StyledProps<ButtonProps>) => getNeutralTransparentButtonStyles(props.theme)),
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      htmlAttributes: { rootButton: rootButtonHTMLAttributes } = {},
      size = 'md',
      color = 'primary',
      variant = 'filled',
      disabled,
      children,
    }: ButtonProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>,
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isClicking, setIsClicking] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const ButtonComponent = componentsMap[variant][color];

    useImperativeHandle(forwardedRef, () => buttonRef.current as HTMLButtonElement);

    const preventFocusOnClick = (event: MouseEvent<HTMLButtonElement>): void => {
      if (event.detail === 0) {
        // This means that the click was triggered by a keyboard event. We want to keep the focus in that case.
        return;
      }
      event.currentTarget.blur();
    };

    const handleKeyEvent = (event: KeyboardEvent<HTMLButtonElement>): void => {
      if (event.key === ' ') {
        if (event.type === 'keydown') {
          setIsActive(true);
        } else if (event.type === 'keyup') {
          setIsActive(false);
        }
      }
    };

    const handleMouseEvent = (event: MouseEvent<HTMLButtonElement>): void => {
      if (event.type === 'mousedown') {
        setIsClicking(true);
      } else if (event.type === 'mouseup') {
        setIsClicking(false);
      }
    };

    return (
      <ButtonComponent
        {...rootButtonHTMLAttributes}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyEvent}
        onKeyUp={handleKeyEvent}
        onClick={preventFocusOnClick}
        onMouseDown={handleMouseEvent}
        onMouseUp={handleMouseEvent}
        color={color}
        disabled={disabled}
        size={size}
        ref={buttonRef}
      >
        <FocusRing color={color} radius={13} show={isFocused && !isClicking} pressed={isActive} />
        {children}
      </ButtonComponent>
    );
  },
);

Button.displayName = 'Button';
