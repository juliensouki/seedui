import {
  ForwardedRef,
  forwardRef,
  MouseEvent,
  ReactNode,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import styled from 'styled-components';

import { SeedContextType, Theme } from '../../../types';
import { ButtonBaseProps, ButtonCommon, ButtonSizes, defaultProps, stylesMapBuilder } from '../_common';
import { InternalProps, StyledProps } from '../../../types/internal';
import { getDefaultProps } from '../../../utils/props';
import { SeedContext } from '../../ThemeProvider/context';
import { Loader } from '../../_internal/Loader/Loader';

/** Props for the Button component — extends ButtonBaseProps with children content. */
export interface ButtonProps extends ButtonBaseProps {
  /** Button label or content. */
  children?: ReactNode;
}

const getButtonStyles = (
  theme: Theme,
): Record<ButtonSizes, { fontSize: string | number; borderRadius: number; padding: string }> => ({
  sm: {
    fontSize: theme.typography.small.fontSize,
    borderRadius: theme.borderRadius(3),
    padding: `${theme.spacing(0.375)}px ${theme.spacing(0.875)}px`,
  },
  md: {
    fontSize: theme.typography.p.fontSize,
    borderRadius: theme.borderRadius(4),
    padding: `${theme.spacing(0.75)}px ${theme.spacing(1.25)}px`,
  },
  lg: {
    fontSize: theme.typography.p.fontSize,
    borderRadius: theme.borderRadius(5),
    padding: `${theme.spacing(1.25)}px ${theme.spacing(1.75)}px`,
  },
});

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

/** A clickable button for triggering actions. Available in filled and transparent variants across primary, neutral, and error colors. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps & InternalProps, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      onClick,
      variant,
      color,
      disabled,
      size,
      type,
      isLoading,
      className,
      children,
      elementProps: _elementProps,
      ...restProps
    } = getDefaultProps<ButtonProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.button?.defaultProps,
      defaultProps: defaultProps as ButtonProps,
    });

    const innerRef = useRef<HTMLButtonElement>(null);
    const [buttonSize, setButtonSize] = useState<{
      width?: number;
      height?: number;
    }>({});

    useImperativeHandle(forwardedRef, () => innerRef.current as HTMLButtonElement);

    useLayoutEffect(() => {
      if (innerRef.current && !isLoading) {
        const { width, height } = innerRef.current.getBoundingClientRect();
        setButtonSize({ width, height });
      }
    }, [isLoading, children]);

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

    const ButtonComponent = componentsMap[variant][color];

    return (
      <ButtonComponent
        {...restProps}
        onClick={preventFocusOnClick}
        color={color}
        disabled={disabled}
        size={size}
        type={type}
        className={className}
        $customizations={customizations.components?.button}
        ref={innerRef}
        // lock dimensions when loading, merge with user-provided style
        style={{
          ...restProps?.style,
          ...(isLoading && buttonSize.width && buttonSize.height
            ? {
              width: `${buttonSize.width}px`,
              height: `${buttonSize.height}px`,
            }
            : undefined),
        }}
      >
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
