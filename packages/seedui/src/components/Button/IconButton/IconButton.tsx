import {
  ForwardedRef,
  forwardRef,
  MouseEvent,
  ReactNode,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import styled from 'styled-components';

import { ButtonBaseProps, ButtonCommon, ButtonSizes, defaultProps, stylesMapBuilder } from '../_common';
import { InternalProps, StyledProps } from '../../../types/internal';
import { getDefaultProps } from '../../../utils/props';
import { SeedContextType } from '../../../types';
import { SeedContext } from '../../ThemeProvider/context';

/** Props for the IconButton component — a circular button designed to hold a single icon. */
export interface IconButtonProps extends ButtonBaseProps {
  /** Icon element to display inside the button. */
  children?: ReactNode;
}

const mapSizeToAttributes: Record<ButtonSizes, { iconSize: number }> = {
  sm: { iconSize: 16 },
  md: { iconSize: 18 },
  lg: { iconSize: 24 },
};

const IconButtonBase = styled(ButtonCommon)((props: StyledProps<Required<IconButtonProps>>) => {
  const theme = props.theme;
  const size = props.size;
  const isLight = theme.mode === 'light';

  return {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: '100%',
    padding: size === 'sm' ? theme.spacing(0.75) : size === 'md' ? theme.spacing(1) : theme.spacing(1.25),

    '& svg': {
      color: isLight ? theme.colors.neutral.white : theme.colors.neutral[100],
      width: mapSizeToAttributes[size].iconSize,
      height: mapSizeToAttributes[size].iconSize,
    },
  };
});

const componentsMap = stylesMapBuilder(IconButtonBase);

/** A circular button designed for icon-only actions like edit, delete, or settings. */
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
      children,
      elementProps: _elementProps,
      ...restProps
    } = getDefaultProps<IconButtonProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.iconButton?.defaultProps,
      defaultProps: defaultProps as IconButtonProps,
    });

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

    return (
      <IconButtonComponent
        {...restProps}
        onClick={preventFocusOnClick}
        color={color}
        disabled={disabled}
        size={size}
        className={className}
        $customizations={customizations.components?.iconButton}
        ref={buttonRef}
      >
        {children}
      </IconButtonComponent>
    );
  },
);

IconButton.displayName = 'IconButton';
