import {
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';

import { TextPropsAndAttributes } from '../Text';
import { ContainerWithLabel } from '../_internal/ContainerWithLabel';
import { InternalProps, StyledComponentsPrefix, StyledProps } from '../../types/internal';
import { joinClasses } from '../../utils/classes';
import { applyCustomStyles } from '../../utils/custom-styles';
import { getDefaultProps } from '../../utils/props';
import { SeedContextType } from '../../types';
import { SeedContext } from '../ThemeProvider/context';

export type InputIconPlacement = 'left' | 'right';
export type InputType = 'email' | 'number' | 'password' | 'tel' | 'text' | 'url';

/** A text input field with optional label, icon, and inline validation. */
export interface InputProps {
  /** Current input value (controlled). */
  value: string;
  /** Label text displayed above the input. */
  label?: string;
  /** Placeholder text shown when the input is empty. */
  placeholder?: string;
  /** Disables the input and applies a muted appearance. */
  disabled?: boolean;
  /** HTML input type — 'text', 'email', 'password', 'number', 'tel', or 'url'. */
  type?: InputType;
  /** Validation function — receives the current value, returns true if valid (shows a checkmark). */
  inputValidation?: (value: string) => boolean;
  /** Icon to display inside the input, with optional placement ('left' or 'right'). */
  inputIcon?: {
    icon: ReactNode;
    placement?: InputIconPlacement;
  };
  /** Input width — number (px) or string (e.g. '100%'). */
  width?: string | number;
  /** Change handler called when the user types. */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Pass props directly to internal sub-components like the label text. */
  forwardProps?: {
    labelTextProps?: TextPropsAndAttributes;
  };
  /** Access underlying DOM elements (root, container, input, icon, validation) for custom attributes. */
  elementProps?: {
    root?: HTMLAttributes<HTMLDivElement>;
    container?: HTMLAttributes<HTMLDivElement>;
    input?: HTMLAttributes<HTMLInputElement>;
    iconContainer?: HTMLAttributes<HTMLDivElement>;
    validationIcon?: HTMLAttributes<HTMLDivElement>;
  };
}

const defaultProps: InputProps = {
  value: '',
  type: 'text',
  onChange: undefined,
  inputValidation: undefined,
  width: 200,
  inputIcon: { icon: null, placement: 'left' },
  elementProps: {
    root: {},
    container: {},
    input: {},
    iconContainer: {},
    validationIcon: {},
  },
  forwardProps: {
    labelTextProps: {},
  },
};

const IconContainer = styled.div<StyledComponentsPrefix<{ placement: InputIconPlacement }>>(
  ({ theme, $placement }) => {
    const isLight = theme.mode === 'light';
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isLight ? theme.colors.neutral[300] : theme.colors.neutral[600],
      borderTopRightRadius: $placement === 'left' ? 0 : 'inherit',
      borderBottomRightRadius: $placement === 'left' ? 0 : 'inherit',
      borderTopLeftRadius: $placement === 'right' ? 0 : 'inherit',
      borderBottomLeftRadius: $placement === 'right' ? 0 : 'inherit',

      padding: `0px ${theme.spacing(1)}px`,

      '& svg': {
        width: 18,
        height: 18,
        color: isLight ? theme.colors.neutral.black : theme.colors.neutral.white,
      },
    };
  },
);

const ValidationIconContainer = styled.div(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  backgroundColor: theme.colors.neutral.white,
  borderRadius: '50%',
  zIndex: 1,
}));

const ValidationIcon = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 14,
  height: 14,
  backgroundColor: theme.colors.success.default,
  borderRadius: '50%',

  '& svg': {
    width: 10,
    height: 10,
    color: theme.colors.neutral.white,
  },
}));

const InputElement = applyCustomStyles(
  styled.input<
    StyledComponentsPrefix<Required<InputProps & { iconPlacement: InputIconPlacement; isValidated: boolean }>>
  >(({ theme, $iconPlacement, $isValidated }) => {
    const isLight = theme.mode === 'light';
    const rightPadding = $isValidated ? theme.spacing(4) : theme.spacing(1.5);

    return {
      width: '100%',
      padding: `${theme.spacing(1.5)}px ${rightPadding}px ${theme.spacing(1.5)}px ${theme.spacing(1.5)}px`,

      borderTopRightRadius: $iconPlacement === 'right' ? 0 : 'inherit',
      borderBottomRightRadius: $iconPlacement === 'right' ? 0 : 'inherit',
      borderTopLeftRadius: $iconPlacement === 'left' ? 0 : 'inherit',
      borderBottomLeftRadius: $iconPlacement === 'left' ? 0 : 'inherit',
      border: `1px solid ${isLight ? theme.colors.neutral[300] : theme.colors.neutral[600]}`,

      backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[300],
      color: isLight ? theme.colors.neutral.black : theme.colors.neutral.white,

      fontFamily: theme.typography.p.fontFamily,
      fontSize: theme.typography.p.fontSize,

      '&::placeholder': {
        color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[600],
      },

      '&:hover': {
        borderColor: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],

        [`& + ${IconContainer}`]: {
          backgroundColor: isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
        },
      },

      '&:focus': {
        outline: 'none',
        borderColor: theme.colors.primary.default,
        [`& + ${IconContainer}`]: {
          backgroundColor: theme.colors.primary.default,

          '& > svg': {
            color: theme.colors.neutral.white,
          },
        },
      },

      '&:disabled': {
        backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[300],
        borderColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[400],
        color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[500],

        '&::placeholder': {
          color: isLight ? theme.colors.neutral[300] : theme.colors.neutral[500],
        },

        [`& + ${IconContainer}`]: {
          backgroundColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[400],

          '& > svg': {
            color: theme.colors.neutral[400],
          },
        },
      },
    };
  }),
);

const InputContainer = styled.div<StyledComponentsPrefix<StyledProps<{ iconPlacement: InputIconPlacement }>>>(
  ({ theme, $iconPlacement }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: $iconPlacement === 'right' ? 'row' : 'row-reverse',
    width: '100%',
    borderRadius: theme.borderRadius(4),

    '&:focus-within': {
      outline: `2px solid ${theme.colors.primary[400]}`,
      outlineOffset: 1,
    },
  }),
);

/** A text input field with optional label, icon, and real-time validation indicator. */
export const Input = forwardRef<HTMLInputElement, InputProps & InternalProps>(
  (props, forwardedRef: ForwardedRef<HTMLInputElement>) => {
    const { customizations } = useContext<SeedContextType>(SeedContext);
    const {
      value,
      onChange,
      placeholder,
      label,
      disabled,
      width,
      inputIcon,
      forwardProps,
      elementProps,
      type,
      className,
      inputValidation,
    } = getDefaultProps<InputProps & InternalProps>({
      providedProps: props,
      globalDefaultProps: customizations?.components?.input?.defaultProps,
      defaultProps,
    });
    const { icon, placement: iconPlacement = 'left' } = inputIcon;
    const [isValidated, setIsValidated] = useState<boolean>(false);

    useEffect(() => {
      if (inputValidation) {
        setIsValidated(inputValidation(value));
      }
    }, [value, inputValidation]);

    return (
      <ContainerWithLabel label={label} forwardProps={forwardProps} elementProps={elementProps} width={width} className="input-root">
        <InputContainer {...elementProps.container} $iconPlacement={iconPlacement} className={joinClasses('input-container', elementProps?.container?.className)}>
          <InputElement
            {...elementProps.input}
            ref={forwardedRef}
            disabled={disabled}
            value={value}
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            className={joinClasses('input-field', className, elementProps?.input?.className)}
            $iconPlacement={icon ? iconPlacement : undefined}
            $isValidated={isValidated}
            $customizations={customizations.components?.input}
          />
          {icon && (
            <IconContainer {...elementProps.iconContainer} $placement={iconPlacement} className={joinClasses('input-icon-container', elementProps?.iconContainer?.className)}>
              {icon}
            </IconContainer>
          )}
          {isValidated && (
            <ValidationIconContainer {...elementProps.validationIcon} className={joinClasses('input-validation-icon', elementProps?.validationIcon?.className)}>
              <ValidationIcon>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </ValidationIcon>
            </ValidationIconContainer>
          )}
        </InputContainer>
      </ContainerWithLabel>
    );
  },
);

Input.displayName = 'Input';
