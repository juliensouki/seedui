import { ChangeEventHandler, ForwardedRef, forwardRef, HTMLAttributes, useContext } from 'react';
import styled from 'styled-components';

import { InternalProps, StyledComponentsPrefix } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContextType, Sizes } from '../../types';
import { SeedContext } from '../ThemeProvider/context';

export type ToggleSize = Extract<Sizes, 'sm' | 'md' | 'lg'>;

export interface ToggleProps {
  checked: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  label?: string;
  size?: ToggleSize;
  elementProps?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
    label?: HTMLAttributes<HTMLLabelElement>;
    input?: HTMLAttributes<HTMLInputElement>;
  };
}

const defaultProps: ToggleProps = {
  checked: false,
  disabled: false,
  size: 'md',
  elementProps: {
    rootDiv: {},
    label: {},
    input: {},
  },
};

const getToggleSizes = (): Record<ToggleSize, { width: number; height: number; thumbSize: number; thumbOffset: number }> => ({
  sm: {
    width: 36,
    height: 20,
    thumbSize: 14,
    thumbOffset: 3,
  },
  md: {
    width: 44,
    height: 24,
    thumbSize: 18,
    thumbOffset: 3,
  },
  lg: {
    width: 52,
    height: 28,
    thumbSize: 22,
    thumbOffset: 3,
  },
});

const ToggleContainer = applyCustomStyles(
  styled.div<StyledComponentsPrefix<Record<string, never>>>(() => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
  })),
);

const ToggleLabel = applyCustomStyles(
  styled.label<StyledComponentsPrefix<{ disabled?: boolean }>>(({ theme, $disabled }) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    fontFamily: theme.typography.p.fontFamily,
    fontSize: theme.typography.p.fontSize,
    color: theme.mode === 'light' ? theme.colors.neutral.black : theme.colors.neutral.white,
    opacity: $disabled ? 0.5 : 1,
  })),
);

const ToggleInput = applyCustomStyles(
  styled.input<StyledComponentsPrefix<{ size: ToggleSize; checked: boolean }>>(({ theme, $size, $checked }) => {
    const isLight = theme.mode === 'light';
    const sizes = getToggleSizes();
    const { width, height, thumbSize, thumbOffset } = sizes[$size];

    return {
      position: 'relative',
      appearance: 'none',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: height,
      backgroundColor: $checked
        ? theme.colors.primary.default
        : isLight
        ? theme.colors.neutral[300]
        : theme.colors.neutral[600],
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease-in-out',
      padding: 0,
      margin: 0,

      '&::before': {
        content: '""',
        position: 'absolute',
        top: `${thumbOffset}px`,
        left: $checked ? `calc(100% - ${thumbSize + thumbOffset}px)` : `${thumbOffset}px`,
        width: `${thumbSize}px`,
        height: `${thumbSize}px`,
        borderRadius: '50%',
        backgroundColor: theme.colors.neutral.white,
        boxShadow: theme.boxShadow[1],
        transition: 'left 0.2s ease-in-out',
      },

      '&:hover:not(:disabled)': {
        backgroundColor: $checked
          ? theme.colors.primary[600]
          : isLight
          ? theme.colors.neutral[400]
          : theme.colors.neutral[500],
      },

      '&:focus': {
        outline: `2px solid ${theme.colors.primary[300]}`,
        outlineOffset: 2,
      },

      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    };
  }),
);

const ToggleLabelText = styled.span(() => ({
  marginLeft: 8,
}));

export const Toggle = forwardRef<HTMLInputElement, ToggleProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLInputElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      checked,
      onChange,
      disabled,
      label,
      size,
      elementProps: { rootDiv: rootDivHTMLAttributes, label: labelHTMLAttributes, input: inputHTMLAttributes },
      className,
    } = getDefaultProps<ToggleProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.toggle?.defaultProps,
      defaultProps,
    });

    return (
      <ToggleContainer
        {...rootDivHTMLAttributes}
        $customizations={customizations.components?.toggle}
        className={joinClasses(className, rootDivHTMLAttributes?.className)}
      >
        <ToggleLabel
          {...labelHTMLAttributes}
          $disabled={disabled}
          $customizations={customizations.components?.toggle}
          className={joinClasses(labelHTMLAttributes?.className)}
        >
          <ToggleInput
            {...inputHTMLAttributes}
            ref={forwardedRef}
            type="checkbox"
            role="switch"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            $size={size}
            $checked={checked}
            $customizations={customizations.components?.toggle}
            className={joinClasses(inputHTMLAttributes?.className)}
            aria-checked={checked}
          />
          {label && <ToggleLabelText>{label}</ToggleLabelText>}
        </ToggleLabel>
      </ToggleContainer>
    );
  },
);

Toggle.displayName = 'Toggle';
