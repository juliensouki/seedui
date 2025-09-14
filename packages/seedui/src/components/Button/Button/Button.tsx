import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { FocusRing } from '../../_internal/FocusRing';
import { SeedContextType, Theme } from '../../../types';
import { ButtonBaseProps, ButtonCommon, ButtonSizes, defaultProps, stylesMapBuilder } from '../_common';
import { InternalProps, StyledProps } from '../../../types/internal';
import { joinClasses } from '../../../utils/classes';
import { getDefaultProps } from '../../../utils/props';
import { SeedContext } from '../../ThemeProvider/context';
import { Loader } from '../../_internal/Loader/Loader';

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
  md: 50,
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

const componentsMap = stylesMapBuilder(ButtonBase);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps & InternalProps, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      onClick,
      variant,
      color,
      disabled,
      size,
      isLoading,
      className,
      htmlAttributes: { rootButton: rootButtonHTMLAttributes },
      children,
    } = getDefaultProps<ButtonProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.button?.defaultProps,
      defaultProps: defaultProps as ButtonProps,
    });

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isClicking, setIsClicking] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const ButtonComponent = componentsMap[variant][color];

    useImperativeHandle(forwardedRef, () => buttonRef.current as HTMLButtonElement);

    const preventFocusOnClick = (event: MouseEvent<HTMLButtonElement>): void => {
      if (onClick && !isLoading) {
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
        $customizations={customizations.components?.button}
        ref={buttonRef}
      >
        <FocusRing
          color={color}
          radius={mapSizeToRingBorderRadius[size]}
          show={isFocused && !isClicking}
          pressed={isActive}
        />
        {isLoading ? (
          <Loader size={size} color={color === 'primary' && variant === 'filled' ? 'white' : undefined} />
        ) : (
          children
        )}
      </ButtonComponent>
    );
  },
);

Button.displayName = 'Button';
