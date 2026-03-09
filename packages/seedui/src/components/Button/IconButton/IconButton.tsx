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

import { ButtonBaseProps, ButtonCommon, ButtonSizes, defaultProps, stylesMapBuilder } from '../_common';
import { InternalProps, StyledProps } from '../../../types/internal';
import { joinClasses } from '../../../utils/classes';
import { getDefaultProps } from '../../../utils/props';
import { SeedContextType } from '../../../types';
import { SeedContext } from '../../ThemeProvider/context';

export interface IconButtonProps extends ButtonBaseProps {
  children?: ReactNode;
}

const mapSizeToAttributes: Record<ButtonSizes, { iconSize: number }> = {
  sm: { iconSize: 17 },
  md: { iconSize: 22 },
  lg: { iconSize: 30 },
};

const IconButtonBase = styled(ButtonCommon)((props: StyledProps<Required<IconButtonProps>>) => {
  const theme = props.theme;
  const size = props.size;
  const isLight = theme.mode === 'light';

  return {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    padding: size === 'sm' ? theme.spacing(1) : theme.spacing(1.5),

    '& svg': {
      color: isLight ? theme.colors.neutral.white : theme.colors.neutral[900],
      width: mapSizeToAttributes[size].iconSize,
      height: mapSizeToAttributes[size].iconSize,
    },
  };
});

const componentsMap = stylesMapBuilder(IconButtonBase);

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props: IconButtonProps & InternalProps, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      onClick,
      variant,
      color,
      disabled,
      size,
      className,
      htmlAttributes: { rootButton: rootButtonHTMLAttributes },
      children,
    } = getDefaultProps<IconButtonProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.iconButton?.defaultProps,
      defaultProps: defaultProps as IconButtonProps,
    });

    const [_isFocused, setIsFocused] = useState<boolean>(false);
    const [_isActive, setIsActive] = useState<boolean>(false);
    const [_isClicking, setIsClicking] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const IconButtonComponent = componentsMap[variant][color];

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
        className={joinClasses(className, rootButtonHTMLAttributes?.className)}
        $customizations={customizations.components?.iconButton}
        ref={buttonRef}
      >
        {children}
      </IconButtonComponent>
    );
  },
);

IconButton.displayName = 'IconButton';
