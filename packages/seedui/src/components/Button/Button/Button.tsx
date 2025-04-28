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
import styled, { useTheme } from 'styled-components';

import { FocusRing } from '../../_internal/FocusRing';
import { Theme } from '../../../types';
import {
  getNeutralFilledButtonStyles,
  getNeutralTransparentButtonStyles,
  getPrimaryFilledButtonStyles,
  getPrimaryTransparentButtonStyles,
  getSecondaryFilledButtonStyles,
  getSecondaryTransparentButtonStyles,
  ButtonBaseProps,
  ButtonColors,
  ButtonCommon,
  ButtonSizes,
  ButtonVariants,
  defaultProps,
} from '../_common';
import { InternalProps, StyledProps } from '../../../types/internal';
import { joinClasses } from '../../../utils/classes';
import { applyCustomStyles } from '../../../utils/custom-styles';
import { getDefaultProps } from '../../../utils/props';

export interface ButtonProps extends ButtonBaseProps {
  children?: ReactNode;
}

const getButtonStyles = (
  theme: Theme,
): Record<ButtonSizes, { fontSize: string | number; borderRadius: number; padding: string }> => ({
  sm: {
    fontSize: theme.typography.small.responsive.desktop.fontSize,
    borderRadius: theme.borderRadius['075'],
    padding: `${theme.spacing['050']}px ${theme.spacing[100]}px`,
  },
  md: {
    fontSize: theme.typography.p.responsive.desktop.fontSize,
    borderRadius: theme.borderRadius[100],
    padding: `${theme.spacing[100]}px ${theme.spacing[150]}px`,
  },
  lg: {
    fontSize: theme.typography.p.responsive.desktop.fontSize,
    borderRadius: theme.borderRadius[125],
    padding: `${theme.spacing[150]}px ${theme.spacing[200]}px`,
  },
});

const mapSizeToRingBorderRadius: Record<ButtonSizes, number> = {
  sm: 11,
  md: 13,
  lg: 15,
};

export const ButtonBase = styled(ButtonCommon)((props: StyledProps<Required<ButtonProps>>) => {
  const size = props.size;
  const { fontSize, borderRadius, padding } = getButtonStyles(props.theme)[size];

  return {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: props.theme.typography.p.fontFamily,
    fontSize,
    borderRadius,
    padding,
    lineHeight: '24px',

    '&:hover': {
      cursor: 'pointer',
    },
  };
});

const componentsMap: Record<ButtonVariants, Record<ButtonColors, typeof ButtonBase>> = {
  filled: {
    primary: applyCustomStyles(
      styled(ButtonBase)((props: StyledProps<ButtonProps>) => getPrimaryFilledButtonStyles(props.theme)),
      'button',
    ),
    secondary: applyCustomStyles(
      styled(ButtonBase)((props: StyledProps<ButtonProps>) => getSecondaryFilledButtonStyles(props.theme)),
      'button',
    ),
    neutral: applyCustomStyles(
      styled(ButtonBase)((props: StyledProps<ButtonProps>) => getNeutralFilledButtonStyles(props.theme)),
      'button',
    ),
  },
  transparent: {
    primary: applyCustomStyles(
      styled(ButtonBase)((props: StyledProps<ButtonProps>) => getPrimaryTransparentButtonStyles(props.theme)),
      'button',
    ),
    secondary: applyCustomStyles(
      styled(ButtonBase)((props: StyledProps<ButtonProps>) => getSecondaryTransparentButtonStyles(props.theme)),
      'button',
    ),
    neutral: applyCustomStyles(
      styled(ButtonBase)((props: StyledProps<ButtonProps>) => getNeutralTransparentButtonStyles(props.theme)),
      'button',
    ),
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps & InternalProps, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
    const theme = useTheme();
    const {
      onClick,
      variant,
      color,
      disabled,
      size,
      className,
      htmlAttributes: { rootButton: rootButtonHTMLAttributes },
      children,
    } = getDefaultProps<ButtonProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: theme?.components?.button?.defaultProps,
      defaultProps,
    });

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isClicking, setIsClicking] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const ButtonComponent = componentsMap[variant][color];

    useImperativeHandle(forwardedRef, () => buttonRef.current as HTMLButtonElement);

    const preventFocusOnClick = (event: MouseEvent<HTMLButtonElement>): void => {
      if (onClick) {
        onClick(event);
      }
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
        className={joinClasses(className, rootButtonHTMLAttributes?.className)}
        ref={buttonRef}
      >
        <FocusRing
          color={color}
          radius={mapSizeToRingBorderRadius[size]}
          show={isFocused && !isClicking}
          pressed={isActive}
        />
        {children}
      </ButtonComponent>
    );
  },
);

Button.displayName = 'Button';
