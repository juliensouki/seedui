import { ChangeEventHandler, ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

import { Text, TextPropsAndAttributes } from '../Text';
import { StyledProps } from '../../types';

export type InputIconPlacement = 'left' | 'right';

export interface InputProps {
  value: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  inputIcon?: {
    icon: ReactNode;
    placement?: InputIconPlacement;
  };
  onChange: ChangeEventHandler<HTMLInputElement>;
  forwardProps?: {
    labelTextProps?: TextPropsAndAttributes;
  };
  htmlAttributes?: {
    rootDiv?: HTMLAttributes<HTMLDivElement>;
    inputContainerDiv?: HTMLAttributes<HTMLDivElement>;
    input?: HTMLAttributes<HTMLInputElement>;
    iconContainerDiv?: HTMLAttributes<HTMLDivElement>;
  };
}

const IconContainer = styled.div<{ placement: InputIconPlacement }>(({ theme, placement }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.neutral[300],
  borderTopRightRadius: placement === 'left' ? 0 : 'inherit',
  borderBottomRightRadius: placement === 'left' ? 0 : 'inherit',
  borderTopLeftRadius: placement === 'right' ? 0 : 'inherit',
  borderBottomLeftRadius: placement === 'right' ? 0 : 'inherit',

  padding: `0px ${theme.spacing[100]}px`,

  '& svg': {
    width: 18,
    height: 18,
  },
}));

const InputElement = styled.input<Required<InputProps & { iconPlacement: InputIconPlacement }>>(
  ({ theme, iconPlacement }) => {
    const isLight = theme.mode === 'light';

    return {
      width: '100%',
      padding: `${theme.spacing[100]}px ${theme.spacing[150]}px`,

      borderTopRightRadius: iconPlacement === 'right' ? 0 : 'inherit',
      borderBottomRightRadius: iconPlacement === 'right' ? 0 : 'inherit',
      borderTopLeftRadius: iconPlacement === 'left' ? 0 : 'inherit',
      borderBottomLeftRadius: iconPlacement === 'left' ? 0 : 'inherit',
      border: `1px solid ${isLight ? theme.colors.neutral[300] : theme.colors.neutral[400]}`,

      backgroundColor: isLight ? theme.colors.neutral.white : theme.colors.neutral[700],
      color: isLight ? theme.colors.neutral.black : theme.colors.neutral.white,

      fontFamily: theme.typography.p.fontFamily,
      fontSize: theme.typography.p.responsive.desktop.fontSize,

      '&::placeholder': {
        color: isLight ? theme.colors.neutral[300] : theme.colors.neutral[400],
      },

      '&:hover': {
        borderColor: isLight ? theme.colors.neutral[500] : theme.colors.neutral[200],

        [`& + ${IconContainer}`]: {
          backgroundColor: isLight ? theme.colors.neutral[500] : theme.colors.neutral[200],
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
        backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[800],
        borderColor: isLight ? theme.colors.neutral[200] : theme.colors.neutral[600],
      },
    };
  },
);

const RootDiv = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}));

const InputContainer = styled.div<StyledProps<{ iconPlacement: InputIconPlacement }>>(({ theme, iconPlacement }) => ({
  display: 'flex',
  flexDirection: iconPlacement === 'right' ? 'row' : 'row-reverse',
  width: 200,
  borderRadius: theme.borderRadius[100],
}));

export const Input = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      value,
      onChange,
      placeholder,
      label,
      disabled,
      inputIcon: { icon, placement: iconPlacement } = { icon: null, placement: 'left' },
      forwardProps = {},
      htmlAttributes = {},
    }: InputProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <RootDiv {...htmlAttributes.rootDiv}>
        {label && (
          <Text {...forwardProps?.labelTextProps} variant="caption">
            Label
          </Text>
        )}
        <InputContainer {...htmlAttributes.inputContainerDiv} iconPlacement={iconPlacement}>
          <InputElement
            {...htmlAttributes.input}
            ref={forwardedRef}
            disabled={disabled}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            iconPlacement={icon ? iconPlacement : undefined}
          />
          {icon && (
            <IconContainer {...htmlAttributes.iconContainerDiv} placement={iconPlacement}>
              {icon}
            </IconContainer>
          )}
        </InputContainer>
      </RootDiv>
    );
  },
);

Input.displayName = 'Input';
