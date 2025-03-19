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
import { StyledProps } from '../../../types';
import { getPrimaryFilledButtonStyles } from '../_common/styles/get-primary-filled-styles';
import { getPrimaryTransparentButtonStyles } from '../_common/styles/get-primary-transparent-styles';
import { getSecondaryFilledButtonStyles } from '../_common/styles/get-secondary-filled-styles';
import { getNeutralFilledButtonStyles } from '../_common/styles/get-neutral-filled-styles';
import { getSecondaryTransparentButtonStyles } from '../_common/styles/get-secondary-transparent-styles';
import { getNeutralTransparentButtonStyles } from '../_common/styles/get-neutral-transparent-styles';
import { ButtonBaseProps, ButtonColors, ButtonCommon, ButtonSizes, ButtonVariants } from '../_common/ButtonCommon';

export interface IconButtonProps extends ButtonBaseProps {
  children?: ReactNode;
}

const mapSizeToAttributes: Record<ButtonSizes, { iconSize: number }> = {
  sm: { iconSize: 17 },
  md: { iconSize: 22 },
  lg: { iconSize: 30 },
};

export const IconButtonBase = styled(ButtonCommon)((props: StyledProps<Required<IconButtonProps>>) => {
  const theme = props.theme;
  const size = props.size;
  const isLight = theme.mode === 'light';

  return {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    padding: size === 'sm' ? theme.spacing[100] : theme.spacing[150],

    '& svg': {
      color: isLight ? theme.colors.neutral.white : theme.colors.neutral[900],
      width: mapSizeToAttributes[size].iconSize,
      height: mapSizeToAttributes[size].iconSize,
    },
  };
});

const componentsMap: Record<ButtonVariants, Record<ButtonColors, typeof IconButtonBase>> = {
  filled: {
    primary: styled(IconButtonBase)((props: StyledProps<IconButtonProps>) => getPrimaryFilledButtonStyles(props.theme)),
    secondary: styled(IconButtonBase)((props: StyledProps<IconButtonProps>) =>
      getSecondaryFilledButtonStyles(props.theme),
    ),
    neutral: styled(IconButtonBase)((props: StyledProps<IconButtonProps>) => getNeutralFilledButtonStyles(props.theme)),
  },
  transparent: {
    primary: styled(IconButtonBase)((props: StyledProps<IconButtonProps>) =>
      getPrimaryTransparentButtonStyles(props.theme),
    ),
    secondary: styled(IconButtonBase)((props: StyledProps<IconButtonProps>) =>
      getSecondaryTransparentButtonStyles(props.theme),
    ),
    neutral: styled(IconButtonBase)((props: StyledProps<IconButtonProps>) =>
      getNeutralTransparentButtonStyles(props.theme),
    ),
  },
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      htmlAttributes: { rootButton: rootButtonHTMLAttributes } = {},
      size = 'md',
      color = 'primary',
      variant = 'filled',
      disabled,
      children,
    }: IconButtonProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>,
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isClicking, setIsClicking] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const IconButtonComponent = componentsMap[variant][color];

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
      <IconButtonComponent
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
        <FocusRing color={color} show={isFocused && !isClicking} pressed={isActive} />
        {children}
      </IconButtonComponent>
    );
  },
);

IconButton.displayName = 'IconButton';
